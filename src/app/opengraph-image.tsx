import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero } from "@/lib/copy";

export const alt = "Hampi Sanctuary, an intentional retreat community";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const lockup = readFileSync(
  join(process.cwd(), "public", "logo-lockup-bone.png"),
).toString("base64");

// Satori cannot decode WebP, so this is a JPEG cut of pond-gathering at the
// card's own size.
const background = readFileSync(
  join(process.cwd(), "public", "og-background.jpg"),
).toString("base64");

/**
 * Satori has no access to next/font, so the display face is fetched at build
 * time. A failure here must not break the build, hence the silent fallback.
 */
async function loadDisplayFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400",
    ).then((response) => response.text());
    const url = css.match(
      /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/,
    )?.[1];
    if (!url) return null;
    return await fetch(url).then((response) => response.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const font = await loadDisplayFont();

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        position: "relative",
        width: "100%",
      }}
    >
      <img
        src={`data:image/jpeg;base64,${background}`}
        alt=""
        width={1200}
        height={630}
        style={{ position: "absolute" }}
      />
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(38,55,42,0.94) 0%, rgba(38,55,42,0.86) 55%, rgba(38,55,42,0.4) 100%)",
          display: "flex",
          height: "100%",
          position: "absolute",
          width: "100%",
        }}
      />
      <div
        style={{
          alignItems: "center",
          color: "#e2e0d2",
          display: "flex",
          gap: 64,
          height: "100%",
          padding: "72px 84px",
          position: "relative",
          width: "100%",
        }}
      >
        <img
          src={`data:image/png;base64,${lockup}`}
          alt=""
          width={180}
          height={193}
        />
        <div
          style={{
            display: "flex",
            fontFamily: font ? "Cormorant Garamond" : "serif",
            fontSize: 72,
            lineHeight: 1.08,
            maxWidth: 660,
          }}
        >
          {hero.headline}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: font
        ? [{ name: "Cormorant Garamond", data: font, style: "normal" as const }]
        : undefined,
    },
  );
}
