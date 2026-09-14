// Flags content left invisible by reveal animations, plus basic a11y checks.
// Usage: node scripts/audit.mjs [baseUrl]
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch();

for (const vp of [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
]) {
  const page = await browser.newPage({ viewport: vp });
  await page.goto(base, { waitUntil: "networkidle" });

  // Walk the page the way a reader would, then settle.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
  });
  await page.waitForTimeout(1500);

  const hidden = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll(
      ".reveal, .reveal-rule, .image-reveal > img",
    )) {
      const style = getComputedStyle(el);
      const opacity = Number(style.opacity);
      const box = el.getBoundingClientRect();
      if (opacity < 0.95 && box.height > 0) {
        const section = el.closest("section")?.id ?? "?";
        out.push({
          tag: el.tagName,
          opacity: opacity.toFixed(2),
          clip: style.clipPath,
          section,
          text: (el.textContent ?? el.getAttribute("alt") ?? "").trim().slice(0, 40),
        });
      }
    }
    return out;
  });

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  const tapTargets = await page.evaluate(() => {
    const small = [];
    for (const el of document.querySelectorAll("a, button, summary")) {
      const b = el.getBoundingClientRect();
      if (b.height > 0 && b.height < 24) {
        small.push(`${el.tagName}:${(el.textContent ?? "").trim().slice(0, 24)} h=${Math.round(b.height)}`);
      }
    }
    return small;
  });

  console.log(`\n=== ${vp.name} ===`);
  console.log(`horizontal overflow: ${overflow ? "YES (bug)" : "no"}`);
  console.log(`stuck-invisible reveal elements: ${hidden.length}`);
  for (const h of hidden)
    console.log(
      `   #${h.section.padEnd(12)} opacity ${h.opacity} clip=${h.clip} "${h.text}"`,
    );
  console.log(`tap targets under 24px: ${tapTargets.length}`);
  for (const t of tapTargets.slice(0, 6)) console.log(`   ${t}`);

  await page.close();
}

await browser.close();
