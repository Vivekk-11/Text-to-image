import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export const GeneratedImage = () => {
  const isPending = true;

  return (
    <div className="w-[450px] h-[450px] rounded-xl overflow-hidden absolute left-[25%]">
      {isPending ? (
        <Skeleton className="w-full h-full" />
      ) : (
        <Image
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
          alt="Generated Image"
          src="https://res.cloudinary.com/dz3tveb47/image/upload/v1738148117/Kerela_gwnsh1.jpg"
        />
      )}
    </div>
  );
};
