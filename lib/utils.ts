import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getHistoryData = () => {
  if (window !== undefined) {
    const stored = localStorage.getItem("generatedImages");
    const images = stored ? JSON.parse(stored) : [];
    return images;
  }
  return [];
};
