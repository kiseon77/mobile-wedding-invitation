import { useParams } from "react-router-dom";
import { useGetInvitationData } from "../../features/useGetInvitationData";
import Schedule from "./Schedule";
import { Invitation } from "./Invitation";
import Map from "./Map";
import RSVP from "./RSVP";
import { Money } from "./Money";
import Gallery from "./Gallery";
import { useKakaoShare } from "../../features/useKakaoShare";

function Default() {
  const { slug } = useParams<{ slug: string }>();
  const { isReady, shareToKakao, error: kakaoError } = useKakaoShare();
  const { invitation, family, gallery, loading, error } =
    useGetInvitationData(slug);
  const handleKakaoShare = () => {
    if (!invitation) return;

    const shareData = {
      title: `${invitation.groom_name} ♥ ${invitation.bride_name} 결혼합니다`,
      description: `${invitation.wedding_date} ${invitation.wedding_time}`,
      imageUrl: gallery[0]?.image_url || embellishmentImage[0]?.image_url || "",
    };

    shareToKakao(shareData);
  };
  const embellishmentImage = gallery.filter(
    (item) => item.description === "embellishmentImage"
  );

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;
  if (!invitation) return <div>청첩장을 찾을 수 없습니다.</div>;
  return (
    <main className="my-10">
      <Invitation invitation={invitation} />
      <Schedule
        weddingDate={invitation?.wedding_date}
        weddingTime={invitation?.wedding_time}
      />
      <Map invitation={invitation} />
      <RSVP rsvpImage={embellishmentImage[0]} invitationId={invitation?.id} />
      <Money family={family} />
      <Gallery gallery={gallery} />
      <div className="w-full">
        <button
          onClick={handleKakaoShare}
          disabled={!isReady}
          className="w-full flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <img
            className="w-8"
            src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
            alt="카카오톡 공유 보내기 버튼"
          />
          {isReady ? "카카오톡으로 초대장 보내기" : "로딩 중..."}
        </button>

        {kakaoError && (
          <div className="text-red-500 text-sm mt-2 text-center">
            {kakaoError}
          </div>
        )}
      </div>
    </main>
  );
}

export default Default;
