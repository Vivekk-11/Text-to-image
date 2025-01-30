"use client";

import { ImageCardContainer } from "@/components/image-card-container";
import { MainText } from "@/components/main-text";
import { getHistoryData } from "@/lib/utils";
import Link from "next/link";

export const MainContainer = () => {
  const imagesData = getHistoryData();
  return (
    <>
      {!imagesData ? (
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
        <ImageCardContainer images={imagesData} />
      )}
      ;
    </>
  );
};
