import { useState } from "react";
import type { GalleryItem } from "./useGetInvitationData";

export function useGallery(gallery: GalleryItem[]) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasImages = gallery.length > 0;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const currentImage = hasImages ? gallery[currentIndex] : null;

  return {
    gallery,
    currentImage,
    currentIndex,
    hasImages,
    nextImage,
    prevImage,
    goToImage,
  };
}
