import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DATA = [
  {
    image:
      "https://res.cloudinary.com/dz3tveb47/image/upload/v1738148116/Other_wygj3t.jpg",
    prompt: "Airport",
    favorite: false,
  },
  {
    image:
      "https://res.cloudinary.com/dz3tveb47/image/upload/v1737715217/bombay-belvedere-living-room_sllwah.webp",
    prompt: "A very Good place with good background",
    favorite: false,
  },
  {
    image:
      "https://res.cloudinary.com/dz3tveb47/image/upload/v1738148116/Other_wygj3t.jpg",
    prompt: "Airport",
    favorite: false,
  },
  {
    image:
      "https://res.cloudinary.com/dz3tveb47/image/upload/v1737715217/bombay-belvedere-living-room_sllwah.webp",
    prompt: "A very Good place with good background",
    favorite: false,
  },
  {
    image:
      "https://res.cloudinary.com/dz3tveb47/image/upload/v1738148116/Other_wygj3t.jpg",
    prompt: "Airport",
    favorite: false,
  },
  {
    image:
      "https://res.cloudinary.com/dz3tveb47/image/upload/v1737715217/bombay-belvedere-living-room_sllwah.webp",
    prompt: "A very Good place with good background",
    favorite: false,
  },
];
