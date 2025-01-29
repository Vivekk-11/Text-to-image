import { ImageCardContainer } from "@/components/image-card-container";
import { DATA } from "@/lib/utils";
import React from "react";

const FavoritesPage = () => {
  return (
    <main>
      <ImageCardContainer images={DATA} />
    </main>
  );
};

export default FavoritesPage;
