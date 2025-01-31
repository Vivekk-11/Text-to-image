"use client";

import { UploadImage } from "./upload-image";
import { GeneratedTags } from "./generated-tags";

export const Tags = () => {
  return (
    <div className="w-full h-full relative">
      <GeneratedTags />
      <UploadImage />
    </div>
  );
};
