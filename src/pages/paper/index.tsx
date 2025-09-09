import { useParams } from "react-router-dom";
import { useGetInvitationData } from "../../features/useGetInvitationData";

export const Paper = () => {
  const { slug } = useParams<{ slug: string }>();
  const { invitation, family, loading, error } = useGetInvitationData(slug);
  console.log(invitation);
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;
  if (!invitation) return <div>청첩장을 찾을 수 없습니다.</div>;
  return <div>index</div>;
};
