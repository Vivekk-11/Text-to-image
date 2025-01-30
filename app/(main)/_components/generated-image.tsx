"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateGenerateImage } from "@/store";
import Image from "next/image";

export const GeneratedImage = () => {
  const { isLoading, generatedImage } = useUpdateGenerateImage(
    (state) => state
  );

  return (
    <div className="w-[450px] h-[450px] rounded-xl overflow-hidden absolute left-[25%]">
      {isLoading ? (
        <Skeleton className="w-full h-full" />
      ) : generatedImage.image ? (
        <Image
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
          alt="Generated Image"
          src={generatedImage.image}
        />
      ) : null}
    </div>
  );
};
