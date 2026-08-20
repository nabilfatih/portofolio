import { ImageResponse } from "next/og";

export const alt = "Nabil Fatih, Product Engineer";
export const contentType = "image/png";
export const size = {
  height: 630,
  width: 1200,
};

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#ffffff",
        color: "#15192a",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%",
      }}
    >
      <div
        style={{
          border: "2px solid #d8dce5",
          borderRadius: "48px",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ color: "#324f8f", display: "flex", fontSize: 36 }}>
          Product Engineer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
          }}
        >
          Nabil Fatih
        </div>
        <div style={{ display: "flex", fontSize: 32 }}>
          Full-stack products, internal tools, and applied AI
        </div>
      </div>
    </div>,
    size
  );
}
