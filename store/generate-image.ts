import { create } from "zustand";
import { v4 as uuid } from "uuid";

type GeneratedImageType = {
  image: string;
  prompt: string;
};

interface UpdateGenerateImage {
  isLoading: boolean;
  generatedImage: GeneratedImageType & {
    id: string;
  };
  updateIsLoading: (isLoading: boolean) => void;
  updateGeneratedImage: (payload: GeneratedImageType) => void;
}

export const useUpdateGenerateImage = create<UpdateGenerateImage>((set) => ({
  isLoading: false,
  generatedImage: { image: "", prompt: "", id: "" },
  updateIsLoading: (isLoading) =>
    set(() => ({
      isLoading,
    })),

  updateGeneratedImage: ({ image, prompt }) =>
    set(() => {
      if (!image || !prompt)
        return {
          generatedImage: { image: "", prompt: "", id: "" },
        };

      const newGeneratedImage = {
        image,
        prompt,
        id: uuid(),
        isFavorite: false,
      };

      const stored = localStorage.getItem("generatedImages");
      const images = stored ? JSON.parse(stored) : [];
      images.push(newGeneratedImage);
      localStorage.setItem("generatedImages", JSON.stringify(images));

      return {
        generatedImage: newGeneratedImage,
      };
    }),
}));
