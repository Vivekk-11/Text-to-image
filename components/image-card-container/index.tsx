import { ImageDataType } from "@/types";
import { ImageCard } from "./image-card";

interface Props {
  images: ImageDataType[];
}

export const ImageCardContainer = ({ images }: Props) => {
  return (
    <div className="w-full grid grid-cols-4 gap-3 p-7">
      {images.map((item, index) => (
        <ImageCard key={item.image + index} imageData={item} />
      ))}
    </div>
  );
};
