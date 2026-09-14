import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

const mark = readFileSync(
  join(process.cwd(), "public", "logo-mark-bone.png"),
).toString("base64");

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#26372a",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <img
        src={`data:image/png;base64,${mark}`}
        alt=""
        height={120}
        width={67}
      />
    </div>,
    size,
  );
}
