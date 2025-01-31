import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateGenerateResponse } from "@/store/generate-response";
import Image from "next/image";

export const GeneratedTags = () => {
  const { isLoading, generatedResponse, uploadedImage } =
    useUpdateGenerateResponse((state) => state);

  return (
    <div className="overflow-hidden absolute left-[25%]">
      {!uploadedImage &&
        !generatedResponse.image &&
        generatedResponse.tags.length === 0 && (
          <h3 className="text-center text-white text-[30px] font-semibold">
            Generated descriptive tags of an image!
          </h3>
        )}
      {uploadedImage && (
        <Image
          width={1000}
          height={1000}
          className={`rounded-xl w-[350px] h-[350px] object-cover ${
            isLoading && "animate-pulse bg-black/30"
          }`}
          alt="Generated Image"
          src={uploadedImage}
        />
      )}
      <div className="mt-4 w-full">
        {isLoading ? (
          <Skeleton className="w-full h-10" />
        ) : (
          generatedResponse.image &&
          generatedResponse.tags.length !== 0 &&
          generatedResponse.tags.map((item, index) => (
            <span
              key={item}
              className="capitalize text-white font-medium text-[20px] mx-2"
            >
              {item}
              {index !== generatedResponse.tags.length - 1 && ","}
            </span>
          ))
        )}
      </div>
    </div>
  );
};
