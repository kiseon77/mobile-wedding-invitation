import { useState, useEffect } from "react";
import type { GalleryItem } from "../../features/useGetInvitationData";

function Gallery({ gallery }: { gallery: GalleryItem[] }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const hasImages: boolean = gallery && gallery.length > 0;

  const minSwipeDistance: number = 50;

  const openModal = (index: number): void => {
    setSelectedImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (): void => {
    setSelectedImageIndex(null);
    document.body.style.overflow = "unset";
  };

  const goToPrevious = (): void => {
    setSelectedImageIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? gallery.length - 1 : prev - 1;
    });
  };

  const goToNext = (): void => {
    setSelectedImageIndex((prev) => {
      if (prev === null) return null;
      return prev === gallery.length - 1 ? 0 : prev + 1;
    });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (): void => {
    if (!touchStart || !touchEnd) return;

    const distance: number = touchStart - touchEnd;
    const isLeftSwipe: boolean = distance > minSwipeDistance;
    const isRightSwipe: boolean = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (selectedImageIndex !== null) {
      document.addEventListener("keydown", handleKeyPress);
      return () => document.removeEventListener("keydown", handleKeyPress);
    }
  }, [selectedImageIndex]);

  const preventImageActions = (
    e: React.MouseEvent | React.DragEvent
  ): false => {
    e.preventDefault();
    return false;
  };

  return (
    <div className="my-10">
      <div className="my-8">
        <p className="text-2xl my-2">갤러리</p>
      </div>

      {hasImages ? (
        <>
          <div className="grid grid-cols-2 gap-3">
            {gallery.map((item: GalleryItem, index: number) => (
              <div
                key={item.id}
                className="cursor-pointer"
                onClick={() => openModal(index)}
              >
                <div className="relative overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={item.image_url}
                    alt={item.description ?? "사진"}
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "auto" }}
                    onContextMenu={preventImageActions}
                    onDragStart={preventImageActions}
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>

          {selectedImageIndex !== null && (
            <div
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
              onClick={closeModal}
            >
              <button
                className="absolute top-4 right-4 text-white text-3xl z-10 hover:text-gray-300"
                onClick={closeModal}
                type="button"
              >
                ×
              </button>

              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-10 hover:text-gray-300 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                type="button"
              >
                ‹
              </button>

              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-10 hover:text-gray-300 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  goToNext();
                }}
                type="button"
              >
                ›
              </button>

              <div
                className="relative max-w-full max-h-full p-4"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={gallery[selectedImageIndex].image_url}
                  alt={gallery[selectedImageIndex].description ?? "사진"}
                  className="max-w-full max-h-[80vh] object-contain"
                  onContextMenu={preventImageActions}
                  onDragStart={preventImageActions}
                  draggable={false}
                />
              </div>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
                {selectedImageIndex + 1} / {gallery.length}
              </div>
            </div>
          )}
        </>
      ) : (
        <p>사진이 없습니다.</p>
      )}
    </div>
  );
}

export default Gallery;
