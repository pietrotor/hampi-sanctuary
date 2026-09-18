// Exercises the pathways tabs and the documentary play target, including
// keyboard reachability and accessible naming.
// Usage: node scripts/slider-check.mjs [baseUrl]
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch();

const activePanelTitle = (page) =>
  page.evaluate(() => {
    const panel = document.querySelector("#pathways [role=tabpanel]:not([inert])");
    return panel?.querySelector("h3")?.textContent?.trim() ?? "none";
  });

for (const vp of [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
]) {
  const page = await browser.newPage({ viewport: vp });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator("#pathways").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  console.log(`\n=== ${vp.name} ===`);

  // Tabs must be visible at every width, not just desktop.
  const tabs = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#pathways [role=tab]")).map((t) => ({
      text: t.textContent.replace(/\s+/g, " ").trim(),
      name: t.getAttribute("aria-label") ?? t.textContent.replace(/\s+/g, " ").trim(),
      visible: t.getBoundingClientRect().width > 0,
      tabIndex: t.tabIndex,
      selected: t.getAttribute("aria-selected"),
    })),
  );
  console.log(`tabs visible: ${tabs.every((t) => t.visible) ? "all 3" : "MISSING (bug)"}`);
  console.log(
    `roving tabindex: ${
      tabs.filter((t) => t.tabIndex === 0).length === 1 ? "ok (single stop)" : "BUG"
    }`,
  );
  // WCAG 2.5.3: the accessible name must contain the visible label.
  const nameMismatch = tabs.filter(
    (t) => !t.name.toLowerCase().includes(t.text.replace(/^\d+\s*/, "").toLowerCase()),
  );
  console.log(
    `label in name: ${nameMismatch.length === 0 ? "ok" : `BUG on ${nameMismatch.map((t) => t.text)}`}`,
  );

  // Keyboard: focus the selected tab, then drive with arrows.
  await page.locator("#pathways [role=tab][aria-selected=true]").focus();
  const focused = await page.evaluate(
    () => document.activeElement?.getAttribute("role") === "tab",
  );
  console.log(`tab focusable: ${focused ? "yes" : "NO (bug)"}`);
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(600);
  console.log(`ArrowRight -> ${await activePanelTitle(page)}`);
  await page.keyboard.press("End");
  await page.waitForTimeout(600);
  console.log(`End -> ${await activePanelTitle(page)}`);
  await page.keyboard.press("Home");
  await page.waitForTimeout(600);
  console.log(`Home -> ${await activePanelTitle(page)}`);
  const followsFocus = await page.evaluate(() => {
    const active = document.activeElement;
    return active?.getAttribute("aria-selected") === "true";
  });
  console.log(`focus follows selection: ${followsFocus ? "yes" : "NO (bug)"}`);

  // Panel wiring.
  const wiring = await page.evaluate(() => {
    const panels = Array.from(document.querySelectorAll("#pathways [role=tabpanel]"));
    return {
      total: panels.length,
      inert: panels.filter((p) => p.hasAttribute("inert")).length,
      labelled: panels.filter((p) => {
        const id = p.getAttribute("aria-labelledby");
        return id && document.getElementById(id);
      }).length,
    };
  });
  console.log(
    `panels: ${wiring.total}, inert ${wiring.inert}, correctly labelled ${wiring.labelled}`,
  );
  const status = await page.locator("#pathways [role=status]").textContent();
  console.log(`live region: "${status.trim()}"`);

  // Documentary: the image itself must be the play target.
  const video = await page.evaluate(() => {
    const link = document.querySelector("#documentary a[href='/documentary']");
    if (!link) return null;
    const img = link.querySelector("img");
    // Centring is measured against the still, not the link: the link also
    // contains the label that sits below the photograph.
    const box = img.getBoundingClientRect();
    const circle = Array.from(link.querySelectorAll("span")).find(
      (s) => Math.round(parseFloat(getComputedStyle(s).borderRadius)) >= 30,
    );
    const c = circle?.getBoundingClientRect();
    return {
      wrapsImage: Boolean(img),
      name: (link.textContent ?? "").trim(),
      imgAlt: img?.getAttribute("alt"),
      areaPx: Math.round(box.width * box.height),
      centred:
        c &&
        Math.abs(c.left + c.width / 2 - (box.left + box.width / 2)) < 2 &&
        Math.abs(c.top + c.height / 2 - (box.top + box.height / 2)) < 2,
    };
  });
  if (!video) console.log("documentary link: NOT FOUND (bug)");
  else
    console.log(
      `documentary: image is the target=${video.wrapsImage}, play control centred=${video.centred}, ` +
        `name="${video.name}", img alt=${JSON.stringify(video.imgAlt)}, hit area=${video.areaPx}px2`,
    );

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  console.log(`horizontal overflow: ${overflow ? "YES (bug)" : "no"}`);

  await page.close();
}

await browser.close();
