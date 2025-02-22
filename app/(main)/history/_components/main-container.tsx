"use client";

import { ImageCardContainer } from "@/components/image-card-container";
import { MainText } from "@/components/main-text";
import { useUpdateImages } from "@/store/images";
import Link from "next/link";
import { useEffect } from "react";

export const MainContainer = () => {
  const { allImages, updateAllImages } = useUpdateImages((state) => state);

  useEffect(() => {
    updateAllImages();
  }, [updateAllImages]);

  return (
    <>
      {allImages.length === 0 ? (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <MainText>You have not generated any images!</MainText>
          <Link
            href="/"
            className="mt-3 bg-slate-200 py-3 px-5 rounded-xl hover:bg-slate-100"
          >
            Generate it here
          </Link>
        </div>
      ) : (
        <ImageCardContainer images={allImages} />
      )}
    </>
  );
};
