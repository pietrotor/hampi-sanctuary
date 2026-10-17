// What each viewport actually downloads for photographs, and whether the
// served file has enough pixels for how large it is painted.
// Usage: node scripts/image-weight.mjs [baseUrl]
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844, scale: 3 },
  { name: "desktop", width: 1440, height: 900, scale: 2 },
];

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.scale,
  });
  const page = await context.newPage();
  const bytes = new Map();
  page.on("response", async (response) => {
    const url = response.url();
    if (!url.includes("/_next/image")) return;
    const body = await response.body().catch(() => null);
    if (body) bytes.set(url, { size: body.length, type: response.headers()["content-type"] });
  });

  await page.goto(base, { waitUntil: "load" });
  // Walk the page so every lazy image and the whole hero rotation load.
  for (let y = 0; y < 40; y++) {
    await page.mouse.wheel(0, vp.height);
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(20000);

  const rows = await page.evaluate(() =>
    Array.from(document.querySelectorAll("img"))
      .filter((img) => img.currentSrc.includes("/_next/image"))
      .map((img) => {
        const url = new URL(img.currentSrc);
        const rect = img.getBoundingClientRect();
        // naturalWidth is density-corrected for srcset picks, so the file's
        // real pixel width has to come from the optimizer URL.
        const fileW = Number(url.searchParams.get("w"));
        const fileH = Math.round((fileW * img.naturalHeight) / img.naturalWidth);
        // object-cover paints the larger of the two scale factors.
        const cover = Math.max(rect.width / fileW, rect.height / fileH);
        return {
          src: url.searchParams.get("url").replace("/photos/", ""),
          current: img.currentSrc,
          served: `${fileW}x${fileH}`,
          upscale: +(cover * window.devicePixelRatio).toFixed(2),
        };
      }),
  );

  let total = 0;
  console.log(`\n${vp.name} ${vp.width}x${vp.height} @${vp.scale}x`);
  for (const row of rows) {
    const hit = bytes.get(row.current);
    total += hit?.size ?? 0;
    const kb = hit ? `${Math.round(hit.size / 1024)}K ${hit.type.replace("image/", "")}` : "?";
    // Above ~1.3 the browser is stretching the file noticeably.
    const flag = row.upscale > 1.3 ? "  <- soft" : "";
    console.log(`  ${row.src.padEnd(30)} ${row.served.padEnd(11)} x${row.upscale}  ${kb}${flag}`);
  }
  console.log(`  total ${Math.round(total / 1024)}K`);
  await context.close();
}

await browser.close();
