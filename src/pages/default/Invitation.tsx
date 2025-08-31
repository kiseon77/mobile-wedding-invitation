import { type Invitation } from "../../features/useGetInvitationData";
import useWeddingDate from "../../features/useWeddingDate";
import { useEffect } from "react";
import useFormatKoreanTime from "../../features/useFormatKoreanTime";

export function Invitation({ invitation }: { invitation: Invitation }) {
  useEffect(() => {
    console.log(invitation);
  });
  const { year, month, day, dayOfWeekEN } = useWeddingDate(
    invitation?.wedding_date || ""
  );
  const formattedTime = useFormatKoreanTime(invitation?.wedding_time || "");

  return (
    <section id="cover" className="">
      <div className="katibeh-regular text-3xl">
        <p>
          {year} / {month} / {day}
        </p>
        <p className=" uppercase opacity-50 tracking-wider"> {dayOfWeekEN}</p>
      </div>
      <div className=" aspect-3/4 w-full overflow-hidden ">
        <img
          className="w-full h-full object-cover"
          src={
            invitation.main_image_url ??
            "https://via.placeholder.com/700x300?text=Wedding+Image"
          }
          alt="결혼식 이미지"
        />
      </div>
      <div className="my-8">
        <p className="text-2xl my-4">
          {invitation.groom_name} · {invitation.bride_name}
        </p>
        <p className="opacity-70">
          {year}년 {month}월 {day}일 {formattedTime} <br />
          {invitation.wedding_hall?.name}
        </p>
      </div>
    </section>
  );
}
