"use client";

import { MainText } from "@/components/main-text";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateGenerateImage } from "@/store/generate-image";
import Image from "next/image";

export const GeneratedImage = () => {
  const { isLoading, generatedImage } = useUpdateGenerateImage(
    (state) => state
  );

  return (
    <div className="rounded-xl overflow-hidden absolute left-[25%]">
      {isLoading ? (
        <Skeleton className="w-[450px] h-[450px]" />
      ) : generatedImage.image ? (
        <Image
          width={1000}
          height={1000}
          className="w-[450px] h-[450px] object-cover"
          alt="Generated Image"
          src={generatedImage.image}
        />
      ) : (
        <MainText>Generate image with ComfyGenerate!</MainText>
      )}
    </div>
  );
};
