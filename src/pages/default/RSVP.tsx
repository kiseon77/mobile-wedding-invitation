import { useState, useEffect } from "react";
import { gsap } from "gsap";
import type { GalleryItem } from "../../features/useGetInvitationData";
import Modal from "./Modal";

function RSVP({
  rsvpImage,
  invitationId,
}: {
  rsvpImage: GalleryItem;
  invitationId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const openModal = () => {
    setIsMounted(true);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".modal-panel",
        { y: "100%" },
        { y: "0%", duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(
        ".modal-backdrop",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power1.out" }
      );
    } else if (isMounted) {
      gsap.to(".modal-panel", {
        y: "100%",
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => setIsMounted(false),
      });
      gsap.to(".modal-backdrop", {
        opacity: 0,
        duration: 0.3,
        ease: "power1.in",
      });
    }
  }, [isOpen]);

  return (
    <section>
      <div>
        <div className="mask-y-from-90% aspect-video overflow-hidden">
          <img src={rsvpImage.image_url} alt="참석여부" />
        </div>
        <div className="my-8">
          <p className="text-2xl my-2">참석 의사 전달</p>
          <p className="opacity-70">
            함께해 주시면 큰 기쁨이겠습니다.
            <br /> 불가피하게 참석이 어려우셔도 <br />
            마음만으로도 감사드립니다.
          </p>
          <div className="w-3/4 mx-auto my-6">
            <button type="button" className="default-btn" onClick={openModal}>
              참석의사 전달하기
            </button>
          </div>
        </div>
      </div>

      {isMounted && (
        <div className="fixed inset-0 w-full h-full z-50">
          <div
            onClick={closeModal}
            className="modal-backdrop absolute inset-0 bg-black/40"
          ></div>

          <div className="modal-panel absolute bottom-0 w-full">
            <Modal invitationId={invitationId} onClose={closeModal} />
          </div>
        </div>
      )}
    </section>
  );
}

export default RSVP;
