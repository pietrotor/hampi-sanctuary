// Measures the real rendered contrast of the documentary label against the
// pixels behind it. Usage: node scripts/contrast-check.mjs [baseUrl]
import { chromium } from "playwright";
import { PNG } from "pngjs";

const base = process.argv[2] ?? "http://localhost:3000";

const channel = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const luminance = (r, g, b) =>
  0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
const ratio = (a, b) => {
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
};

const browser = await chromium.launch();

for (const vp of [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
]) {
  const page = await browser.newPage({ viewport: vp });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator("#documentary").scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);

  const paper = luminance(0xf2, 0xf1, 0xe8);
  console.log(`\n=== ${vp.name} ===`);

  // Sample what sits behind each foreground element, with that element hidden.
  const locate = (target) => {
    const link = document.querySelector("#documentary a[href='/documentary']");
    return target === "label"
      ? Array.from(link.querySelectorAll("span")).find(
          (s) =>
            s.firstChild?.nodeType === Node.TEXT_NODE &&
            s.textContent.trim().toLowerCase().startsWith("watch"),
        )
      : link.querySelector("svg");
  };

  const sample = async (which, minimum) => {
    // The element has to actually be on screen or the clip is meaningless.
    await page.evaluate(
      ([target, src]) => {
        const node = new Function(`return (${src})`)()(target);
        node.scrollIntoView({ block: "center", behavior: "instant" });
      },
      [which, locate.toString()],
    );
    await page.waitForTimeout(500);

    const box = await page.evaluate(
      ([target, src]) => {
        const node = new Function(`return (${src})`)()(target);
        const b = node.getBoundingClientRect();
        node.style.visibility = "hidden";
        return { x: b.x, y: b.y, width: b.width, height: b.height };
      },
      [which, locate.toString()],
    );

    // Let any transition on the hidden element finish, or it is still
    // partly painted when the pixels are read.
    await page.waitForTimeout(450);

    const shot = await page.screenshot({
      clip: {
        x: box.x,
        y: box.y,
        width: Math.max(2, Math.ceil(box.width)),
        height: Math.max(2, Math.ceil(box.height)),
      },
    });
    const png = PNG.sync.read(shot);
    let max = 0;
    for (let i = 0; i < png.data.length; i += 4) {
      max = Math.max(max, luminance(png.data[i], png.data[i + 1], png.data[i + 2]));
    }
    const worst = ratio(paper, max);
    console.log(
      `${which.padEnd(6)} worst-case contrast ${worst.toFixed(2)}:1 ` +
        `(needs ${minimum}:1) ${worst >= minimum ? "PASS" : "FAIL"}`,
    );
    await page.evaluate(() => {
      for (const el of document.querySelectorAll("#documentary [style*='visibility']"))
        el.style.visibility = "";
    });
  };

  await sample("play", 3); // non-text graphic, WCAG 1.4.11
  await sample("label", 4.5); // small text, WCAG 1.4.3

  await page.close();
}

await browser.close();
