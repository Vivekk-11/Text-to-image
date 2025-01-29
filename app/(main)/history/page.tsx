import { ImageCardContainer } from "@/components/image-card-container";
import React from "react";

const HistoryPage = () => {
  const DATA = [
    {
      image:
        "https://res.cloudinary.com/dz3tveb47/image/upload/v1738148116/Other_wygj3t.jpg",
      prompt: "Airport",
    },
    {
      image:
        "https://res.cloudinary.com/dz3tveb47/image/upload/v1737715217/bombay-belvedere-living-room_sllwah.webp",
      prompt: "A very Good place with good background",
    },
    {
      image:
        "https://res.cloudinary.com/dz3tveb47/image/upload/v1738148116/Other_wygj3t.jpg",
      prompt: "Airport",
    },
    {
      image:
        "https://res.cloudinary.com/dz3tveb47/image/upload/v1737715217/bombay-belvedere-living-room_sllwah.webp",
      prompt: "A very Good place with good background",
    },
    {
      image:
        "https://res.cloudinary.com/dz3tveb47/image/upload/v1738148116/Other_wygj3t.jpg",
      prompt: "Airport",
    },
    {
      image:
        "https://res.cloudinary.com/dz3tveb47/image/upload/v1737715217/bombay-belvedere-living-room_sllwah.webp",
      prompt: "A very Good place with good background",
    },
  ];

  return (
    <main>
      <ImageCardContainer images={DATA} />
    </main>
  );
};

export default HistoryPage;
