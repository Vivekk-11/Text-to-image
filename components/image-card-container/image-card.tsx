"use client";

import { ImageDataType } from "@/types";
import Image from "next/image";
import { useState } from "react";

interface Props {
  imageData: ImageDataType;
}

export const ImageCard = ({ imageData }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={(e) => {
        const related = e.relatedTarget as Node;
        if (!related || !e.currentTarget.contains(related)) setIsHovered(false);
      }}
      onMouseDown={() => setIsHovered(true)}
      className={`relative cursor-pointer w-full h-[350px] ${
        isHovered ? "" : ""
      }`}
    >
      <div
        style={{ transition: "all 500ms" }}
        className={`absolute left-0 top-0 w-full h-full bg-black/60 ${
          isHovered ? "opacity-80" : "opacity-0"
        }`}
      />

      <Image
        width={1000}
        height={1000}
        className="rounded-xl w-full h-full object-cover"
        src={imageData.image}
        alt={imageData.prompt}
      />
      <h4
        style={{ transition: "all 400ms" }}
        className={`text-white font-semibold px-2 absolute bottom-2 left-1/2 -translate-x-1/2 w-full mx-auto flex items-center justify-center ${
          isHovered ? "opacity-70" : "opacity-0"
        }`}
      >
        Prompt: {imageData.prompt}
      </h4>
    </div>
  );
};
