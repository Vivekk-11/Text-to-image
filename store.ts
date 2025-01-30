import { create } from "zustand";

interface UpdateGenerateImage {
  isLoading: boolean;
  generatedImage: string;
  updateIsLoading: (isLoading: boolean) => void;
  updateGeneratedImage: (generatedImage: string) => void;
}

export const useUpdateGenerateImage = create<UpdateGenerateImage>((set) => {
  return {
    isLoading: false,
    generatedImage: "",
    updateIsLoading: (isLoading) =>
      set(() => ({
        isLoading,
      })),
    updateGeneratedImage: (generatedImage) =>
      set(() => ({
        generatedImage,
      })),
  };
});
