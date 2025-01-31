import { create } from "zustand";
import { v4 as uuid } from "uuid";

type GeneratedResponseType = {
  image: string;
  prompt: string;
  tags: string[];
};

interface UpdateGenerateResponse {
  uploadedImage: string;
  updateUploadedImage: (uploadedImage: string) => void;
  isLoading: boolean;
  generatedResponse: GeneratedResponseType & {
    id: string;
  };
  updateIsLoading: (isLoading: boolean) => void;
  updateGeneratedResponse: (payload: GeneratedResponseType) => void;
}

export const useUpdateGenerateResponse = create<UpdateGenerateResponse>(
  (set) => ({
    isLoading: false,
    generatedResponse: { image: "", prompt: "", id: "", tags: [] },
    uploadedImage: "",
    updateUploadedImage: (uploadedImage) =>
      set(() => ({
        uploadedImage,
      })),
    updateIsLoading: (isLoading) =>
      set(() => ({
        isLoading,
      })),

    updateGeneratedResponse: ({ image, prompt, tags }) =>
      set(() => {
        if (!image)
          return {
            generatedResponse: { image: "", prompt: "", id: "", tags: [] },
          };

        const newGeneratedImage = {
          image,
          prompt,
          tags,
          id: uuid(),
          isFavorite: false,
        };

        const stored = localStorage.getItem("generatedImages");
        const images = stored ? JSON.parse(stored) : [];
        images.push(newGeneratedImage);
        localStorage.setItem("generatedImages", JSON.stringify(images));

        return {
          generatedResponse: newGeneratedImage,
        };
      }),
  })
);
