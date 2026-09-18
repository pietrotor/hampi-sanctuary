// Inventory of how much room every photograph takes on screen.
// Usage: node scripts/image-scale.mjs [baseUrl] [width]
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3000";
const width = Number(process.argv[3] ?? 1440);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width, height: 900 } });
await p.goto(base, { waitUntil: "networkidle" });
await p.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 40));
  }
});
await p.waitForTimeout(800);

const rows = await p.evaluate(() => {
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  return Array.from(document.querySelectorAll("main img:not([data-logo])")).map((img) => {
    const r = img.getBoundingClientRect();
    const section = img.closest("section[id]")?.id ?? "?";
    return {
      section,
      w: Math.round(r.width),
      h: Math.round(r.height),
      pctWidth: Math.round((r.width / vw) * 100),
      screens: +(r.height / vh).toFixed(2),
    };
  });
});

console.log(`viewport ${width}x900\n`);
console.log("section        rendered      % of width   screen-heights");
let total = 0;
for (const r of rows) {
  total += r.h;
  console.log(
    `${r.section.padEnd(14)} ${`${r.w}x${r.h}`.padEnd(13)} ${String(r.pctWidth).padStart(3)}%` +
      `        ${r.screens}`,
  );
}
const pageH = await p.evaluate(() => document.body.scrollHeight);
console.log(
  `\n${rows.length} photographs, ${total}px of stacked image height ` +
    `= ${Math.round((total / pageH) * 100)}% of the ${pageH}px page`,
);
await b.close();
