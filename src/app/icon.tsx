import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#1c2621",
        color: "#eef1ee",
        display: "flex",
        fontFamily: "serif",
        fontSize: 38,
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      H
    </div>,
    size,
  );
}
