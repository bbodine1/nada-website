import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "North Alabama Drone Applicators",
    short_name: "NADA",
    description:
      "Drone spraying and spreading for Tennessee Valley farms. Join the interest list and download the free North Alabama field guide.",
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
