import { ImageResponse } from "next/og";

export const alt = "Hampi Sanctuary, an intentional retreat community";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "flex-start",
        background: "#1c2621",
        color: "#eef1ee",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px 80px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", fontSize: 26, letterSpacing: "0.08em" }}>
        Hampi Sanctuary
      </div>
      <div
        style={{
          display: "flex",
          fontFamily: "serif",
          fontSize: 76,
          lineHeight: 1.08,
          maxWidth: 850,
        }}
      >
        A place for meaningful transformation.
      </div>
      <div
        style={{
          background: "#b9cbbf",
          display: "flex",
          height: 10,
          width: 180,
        }}
      />
    </div>,
    size,
  );
}
