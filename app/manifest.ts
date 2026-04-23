import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "North Alabama Drone Applicators",
    short_name: "NADA",
    description:
      "Drone spraying and spreading for Tennessee Valley farms. Join the Fall 2026 priority list and request a free overview PDF.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f9f6f0",
    theme_color: "#1e3a0f",
    icons: [
      {
        src: "/logos/nada-icon-light.png",
        sizes: "2000x2000",
        type: "image/png",
      },
      {
        src: "/logos/nada-icon-dark.png",
        sizes: "2000x2000",
        type: "image/png",
      },
    ],
  };
}
