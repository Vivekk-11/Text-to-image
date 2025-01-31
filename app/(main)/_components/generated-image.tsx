"use client";

import { MainText } from "@/components/main-text";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateGenerateResponse } from "@/store/generate-response";
import Image from "next/image";

export const GeneratedImage = () => {
  const { isLoading, generatedResponse } = useUpdateGenerateResponse(
    (state) => state
  );

  return (
    <div className="rounded-xl overflow-hidden absolute left-[25%]">
      {isLoading ? (
        <Skeleton className="w-[450px] h-[450px]" />
      ) : generatedResponse.image ? (
        <Image
          width={1000}
          height={1000}
          className="w-[450px] h-[450px] object-cover"
          alt="Generated Image"
          src={generatedResponse.image}
        />
      ) : (
        <MainText>Generate image with ComfyGenerate!</MainText>
      )}
    </div>
  );
};
