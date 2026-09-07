import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jeseem Tours & Travels - Best Travel Agency in Alappuzha",
    short_name: "Jeseem Tours",
    description:
      "Premier travel agency in Alappuzha, Kerala offering group flight bookings, holiday tour packages, visa assistance, and certificate attestation since 1985.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
