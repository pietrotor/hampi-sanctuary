// Checks that anchored sections clear the sticky nav.
// Usage: node scripts/nav-offset.mjs [baseUrl]
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
];

const browser = await chromium.launch();
let failed = false;

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "load" });
  await page.waitForTimeout(1200);

  const navHeight = await page
    .locator("nav[aria-label='Page sections']")
    .evaluate((el) => el.getBoundingClientRect().height);

  for (const id of ["life", "why", "everyday", "pathways", "people"]) {
    await page.evaluate((anchor) => {
      document.querySelector(`#${anchor}`)?.scrollIntoView();
    }, id);
    await page.waitForTimeout(150);

    const { headingTop, navBottom } = await page.evaluate((anchor) => {
      const heading = document.querySelector(`#${anchor} h2`);
      const nav = document.querySelector("nav[aria-label='Page sections']");
      return {
        headingTop: heading.getBoundingClientRect().top,
        navBottom: nav.getBoundingClientRect().bottom,
      };
    }, id);

    const clearance = headingTop - navBottom;
    const ok = clearance >= 0;
    if (!ok) failed = true;
    console.log(
      `${ok ? "ok  " : "FAIL"} ${vp.name} #${id}: heading clears nav by ${clearance.toFixed(1)}px (nav ${navHeight.toFixed(1)}px)`,
    );
  }

  await context.close();
}

await browser.close();
process.exit(failed ? 1 : 0);
