import { getHistoryData } from "@/lib/utils";
import { ImageDataType } from "@/types";
import { create } from "zustand";

interface UpdateImages {
  allImages: ImageDataType[];
  favoriteImages: ImageDataType[];
  updateFavoriteImage: (imageId: string) => void;
  updateAllImages: () => void;
  updateFavoriteImages: () => void;
}

export const useUpdateImages = create<UpdateImages>((set) => ({
  allImages: [],
  favoriteImages: [],
  updateAllImages: () =>
    set(() => {
      const allImages = getHistoryData();
      return { allImages };
    }),
  updateFavoriteImages: () =>
    set((state) => {
      const favoriteImages = state.allImages.filter(
        (image) => image.isFavorite
      );
      return { favoriteImages };
    }),
  updateFavoriteImage: (imageId) =>
    set((state) => {
      const allImages = state.allImages.map((image) => {
        if (image.id === imageId) {
          return {
            ...image,
            isFavorite: !image.isFavorite,
          };
        }
        return image;
      });

      localStorage.removeItem("generatedImages");
      localStorage.setItem("generatedImages", JSON.stringify(allImages));

      const favoriteImages = allImages.filter((image) => image.isFavorite);

      return { allImages, favoriteImages };
    }),
}));
