import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Phạm Minh Tuấn (MinkTuans) — The Wolf's Journey Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          backgroundColor: "#060a08",
          backgroundImage: "radial-gradient(circle at 80% 30%, rgba(200, 154, 60, 0.15), transparent 60%)",
          color: "#f3f8f5",
          fontFamily: "sans-serif",
          border: "8px solid #14251c",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: "#14251c",
              border: "1px solid #c89a3c",
              fontSize: 26,
            }}
          >
            🐺
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 16, color: "#c89a3c", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700 }}>
              The Wolf&apos;s Journey
            </span>
            <span style={{ fontSize: 14, color: "#69987d" }}>
              Personal Engineering Portfolio
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#f3f8f5",
              margin: 0,
              letterSpacing: "-1px",
              lineHeight: 1.1,
            }}
          >
            Phạm Minh Tuấn
          </h1>
          <p
            style={{
              fontSize: 26,
              color: "#c7ded2",
              margin: 0,
              maxWidth: "950px",
              lineHeight: 1.4,
            }}
          >
            Web Developer chuyên sâu kiến trúc Laravel Service, Next.js & Supabase. Trực tiếp thiết kế REST API, Cloudflare R2 media, Gemini AI & Realtime Reverb.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #1e372b", paddingTop: 30 }}>
          <div style={{ display: "flex", gap: 12 }}>
            {["MindNova AI", "AI Cooking", "Tour Management", "Ngoc Phi Thuy Jade"].map((proj) => (
              <span
                key={proj}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  backgroundColor: "#0f1c15",
                  border: "1px solid #2d4e3d",
                  fontSize: 14,
                  color: "#98bfa9",
                }}
              >
                {proj}
              </span>
            ))}
          </div>
          <span style={{ fontSize: 16, color: "#10b981", fontWeight: 600 }}>
            github.com/MinkTuans
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
