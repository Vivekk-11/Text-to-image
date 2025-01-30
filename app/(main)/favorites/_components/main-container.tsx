"use client";

import { ImageCardContainer } from "@/components/image-card-container";
import { MainText } from "@/components/main-text";
import { useUpdateImages } from "@/store/images";
import Link from "next/link";
import { useEffect } from "react";

export const MainContainer = () => {
  const { favoriteImages, updateFavoriteImages } = useUpdateImages(
    (state) => state
  );

  useEffect(() => {
    updateFavoriteImages();
  }, [updateFavoriteImages]);

  return (
    <>
      {favoriteImages.length === 0 ? (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <MainText>You don&apos;t have favorite images!</MainText>
          <Link
            href="/history"
            className="mt-3 bg-slate-200 py-3 px-5 rounded-xl hover:bg-slate-100"
          >
            Favorite images
          </Link>
        </div>
      ) : (
        <ImageCardContainer images={favoriteImages} />
      )}
    </>
  );
};
