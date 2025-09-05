import { useParams } from "react-router-dom";
import { useGetInvitationData } from "../../features/useGetInvitationData";
import Schedule from "./Schedule";
import { Invitation } from "./Invitation";
import Map from "./Map";
import RSVP from "./RSVP";
import { Money } from "./Money";
import Gallery from "./Gallery";

function Default() {
  const { slug } = useParams<{ slug: string }>();
  const { invitation, family, rsvps, gallery, loading, error, setRsvps } =
    useGetInvitationData(slug);
  console.log(family);
  const embellishmentImage = gallery.filter(
    (item) => item.description === "embellishmentImage"
  );
  window.Kakao.init(process.env.REACT_APP_JAVASCRIPT_KEY);
  window.Kakao.isInitialized();
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
        <a
          id="kakaotalk-sharing-btn"
          href="javascript:shareMessage()"
          className="w-full flex items-center justify-center gap-2"
        >
          <img
            className="w-8 "
            src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
            alt="카카오톡 공유 보내기 버튼"
          />
          카카오톡으로 초대장 보내기
        </a>
      </div>
    </main>
  );
}

export default Default;
