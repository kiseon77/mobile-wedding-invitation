import { useParams } from "react-router-dom";
import { useGetInvitationData } from "../../features/useGetInvitationData";
import Schedule from "./Schedule";
import { Invitation } from "./Invitation";
import Map from "./Map";
import RSVP from "./RSVP";
import { Money } from "./Money";

function Default() {
  const { slug } = useParams<{ slug: string }>();
  const { invitation, family, rsvps, gallery, loading, error, setRsvps } =
    useGetInvitationData(slug);
  console.log(family);
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
    </main>
  );
}

export default Default;
