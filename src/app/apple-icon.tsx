import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0f100e" }}>
        <svg viewBox="0 0 32 32" width="180" height="180">
          <path d="M8 7v18M8 16h6l8-9M14 16l8 9" fill="none" stroke="#ece7dc" strokeWidth="2" />
          <rect x="11.5" y="13.5" width="5" height="5" fill="#d4f54a" />
        </svg>
      </div>
    ),
    size,
  );
}
