import { ImageResponse } from "next/og";
import { person } from "@/content/profile";

export const alt = "Katya Alferov — ETL & BI Developer. Turning complex data into clarity.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const stages = ["Sources", "Extract", "Transform", "SQL / DB", "Warehouse", "BI"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f100e",
          color: "#ece7dc",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 3, color: "#c4bfb3" }}>
          <div style={{ width: 14, height: 14, background: "#d4f54a" }} />
          DATA ENGINEERING / ETL / BI / APPLIED AI
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 1, letterSpacing: -3 }}>
          <div>Turning complex data</div>
          <div style={{ display: "flex", paddingLeft: 180 }}>
            into clarity<span style={{ color: "#d4f54a" }}>.</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {stages.map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    display: "flex",
                    border: `1px solid ${i === 2 ? "#d4f54a" : "#3b3c35"}`,
                    color: i === 2 ? "#d4f54a" : "#8f8b81",
                    padding: "10px 16px",
                    fontSize: 20,
                  }}
                >
                  {s}
                </div>
                {i < stages.length - 1 && <div style={{ width: 40, height: 1, background: "#3b3c35" }} />}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#c4bfb3" }}>
            <span style={{ color: "#ece7dc" }}>{person.name}</span>
            <span>{person.role} · {person.location}</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
