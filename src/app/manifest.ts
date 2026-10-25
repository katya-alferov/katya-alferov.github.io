import type { MetadataRoute } from "next";
import { person, site } from "@/content/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: person.name,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#0f100e",
    theme_color: "#0f100e",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
