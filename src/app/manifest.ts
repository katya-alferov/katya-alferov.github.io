import type { MetadataRoute } from "next";
import { person, site } from "@/content/profile";
import { asset } from "@/lib/paths";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: person.name,
    description: site.description,
    start_url: asset("/"),
    display: "browser",
    background_color: "#0f100e",
    theme_color: "#0f100e",
    icons: [
      { src: asset("/icon.svg"), sizes: "any", type: "image/svg+xml" },
      { src: asset("/apple-icon.png"), sizes: "180x180", type: "image/png" },
    ],
  };
}
