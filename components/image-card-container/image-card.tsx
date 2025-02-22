"use client";

import { useUpdateImages } from "@/store/images";
import { ImageDataType } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

interface Props {
  imageData: ImageDataType;
}

export const ImageCard = ({ imageData }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const { updateFavoriteImage } = useUpdateImages((state) => state);

  const handleFavorite = () => {
    updateFavoriteImage(imageData.id);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={(e) => {
        const related = e.relatedTarget as Node;
        if (!related || !e.currentTarget.contains(related)) setIsHovered(false);
      }}
      onMouseDown={() => setIsHovered(true)}
      className={`relative rounded-xl overflow-hidden cursor-pointer w-full h-[350px]`}
    >
      <div
        style={{ transition: "all 500ms" }}
        className={`absolute left-0 top-0 w-full h-full bg-black/80 ${
          isHovered ? "opacity-80" : "opacity-0"
        }`}
      />

      <button
        onClick={handleFavorite}
        style={{ transition: "all 500ms" }}
        className={`absolute left-2 top-2 ${
          isHovered ? "opacity-80" : "opacity-0"
        }`}
      >
        {imageData.isFavorite ? (
          <MdFavorite size={30} color="white" />
        ) : (
          <MdFavoriteBorder size={30} color="white" />
        )}
      </button>

      <Image
        width={1000}
        height={1000}
        className="w-full h-full object-cover"
        src={imageData.image}
        alt={imageData.prompt}
      />

      <div
        className={`capitalize text-white font-semibold px-2 absolute bottom-2 left-1/2 -translate-x-1/2 w-full mx-auto flex items-center justify-center ${
          isHovered ? "opacity-70" : "opacity-0"
        }`}
        style={{ transition: "all 400ms" }}
      >
        {imageData.prompt ? (
          <h4>Prompt: {imageData.prompt}</h4>
        ) : imageData.tags.length > 0 ? (
          <DisplayTags tags={imageData.tags} />
        ) : null}
      </div>
    </div>
  );
};

const DisplayTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="w-full">
      Tags:{" "}
      {tags.map((item, index) => (
        <span key={item} className="mx-1">
          {item}
          {index !== tags.length - 1 && ","}
        </span>
      ))}
    </div>
  );
};
