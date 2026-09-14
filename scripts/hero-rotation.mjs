// Proves the hero actually advances frames. Usage: node scripts/hero-rotation.mjs [baseUrl]
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto(base, { waitUntil: "networkidle" });

const report = async (label) => {
  const state = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".hero-image img")).map((img) => ({
      opacity: Number(img.style.opacity),
      src: new URL(img.currentSrc || img.src, location.href).searchParams.get(
        "url",
      ),
    })),
  );
  const visible = state.findIndex((s) => s.opacity === 1);
  console.log(
    `${label.padEnd(12)} mounted=${state.length} visible=${visible} ` +
      `photo=${decodeURIComponent(state[visible]?.src ?? "?").slice(30, 62)}`,
  );
};

await report("t=0s");
await page.waitForTimeout(3000);
await report("t=3s");
await page.waitForTimeout(5000);
await report("t=8s");
await page.waitForTimeout(6500);
await report("t=14.5s");

await browser.close();
