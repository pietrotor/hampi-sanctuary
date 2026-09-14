// Design review screenshots. Usage: node scripts/shoot.mjs [baseUrl] [outDir]
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const outDir = process.argv[3] ?? "/tmp/shots";

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844, scale: 2 },
  { name: "desktop", width: 1440, height: 900, scale: 1 },
];

// Section anchors worth reviewing on their own.
const SECTIONS = [
  "life",
  "why",
  "documentary",
  "everyday",
  "pathways",
  "fit",
  "faq",
  "people",
  "invitation",
];

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.scale,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "networkidle" });

  // Let scroll-driven reveals settle at their end state before capturing.
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) requestAnimationFrame(step);
        else resolve(undefined);
      };
      step();
    });
  });
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);

  await page.screenshot({
    path: `${outDir}/${vp.name}-hero.png`,
  });
  await page.screenshot({
    path: `${outDir}/${vp.name}-full.png`,
    fullPage: true,
  });

  for (const id of SECTIONS) {
    const el = page.locator(`#${id}`);
    if ((await el.count()) === 0) continue;
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await el.screenshot({ path: `${outDir}/${vp.name}-${id}.png` });
  }

  await context.close();
  console.log(`captured ${vp.name}`);
}

await browser.close();
console.log(`done -> ${outDir}`);
