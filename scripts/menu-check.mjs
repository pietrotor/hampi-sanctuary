// Mobile sections sheet: entrance frames, keyboard behaviour, anchor handoff.
// Usage: node scripts/menu-check.mjs [baseUrl] [outDir]
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const outDir = process.argv[3] ?? "/tmp/hampi-menu";

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  reducedMotion: "no-preference",
});
const page = await context.newPage();
await page.goto(base, { waitUntil: "load" });
await page.waitForTimeout(1200);

const toggle = page.getByRole("button", { name: "Menu" });

// The bar only sticks once the hero is past, so shoot it there.
await page.locator("#life").scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
await page.screenshot({ path: `${outDir}/bar-closed.png` });

// Mid-entrance frames, to see whether the stagger actually reads.
await toggle.click();
for (const at of [80, 180, 320]) {
  await page.waitForTimeout(at === 80 ? 80 : 100);
  await page.screenshot({ path: `${outDir}/open-${at}ms.png` });
}
await page.waitForTimeout(500);
await page.screenshot({ path: `${outDir}/open-settled.png` });

const state = await page.evaluate(() => {
  const sheet = document.querySelector("#page-sections-sheet");
  const toggle = document.querySelector('[aria-controls="page-sections-sheet"]');
  return {
    open: sheet?.hasAttribute("open"),
    expanded: toggle?.getAttribute("aria-expanded"),
    scrollLocked: document.documentElement.style.overflow,
    pageScrolls: document.documentElement.scrollHeight > window.innerHeight,
  };
});
console.log("open:", state);

// Focus must stay inside a modal dialog.
const ring = [];
for (let i = 0; i < 9; i++) {
  await page.keyboard.press("Tab");
  ring.push(
    await page.evaluate(() => {
      const sheet = document.querySelector("#page-sections-sheet");
      const el = document.activeElement;
      const label = (el?.textContent ?? "").trim().slice(0, 18);
      return `${sheet?.contains(el) ? "in " : "OUT"} ${el?.tagName} ${label}`;
    }),
  );
}
console.log("tab ring:", ring);

await page.keyboard.press("Escape");
await page.waitForTimeout(600);
console.log(
  "escape closed:",
  await page.evaluate(() => {
    const sheet = document.querySelector("#page-sections-sheet");
    return {
      open: sheet?.hasAttribute("open"),
      display: getComputedStyle(sheet).display,
      overflow: document.documentElement.style.overflow || "(restored)",
      focus: document.activeElement?.getAttribute("aria-controls"),
    };
  }),
);

// A link must close the sheet and land on its section.
await toggle.click();
await page.waitForTimeout(500);
await page
  .getByRole("dialog")
  .getByRole("link", { name: "Pathways" })
  .click();
await page.waitForTimeout(1400);
console.log(
  "after link:",
  await page.evaluate(() => {
    const sheet = document.querySelector("#page-sections-sheet");
    const nav = document.querySelector("nav");
    const heading = document.querySelector("#pathways h2");
    return {
      open: sheet?.hasAttribute("open"),
      hash: location.hash,
      // Positive means the heading clears the sticky bar.
      headingBelowNav: Math.round(
        heading.getBoundingClientRect().top -
          nav.getBoundingClientRect().bottom,
      ),
    };
  }),
);
await page.screenshot({ path: `${outDir}/after-link.png` });

await context.close();
await browser.close();
console.log(`shots -> ${outDir}`);
