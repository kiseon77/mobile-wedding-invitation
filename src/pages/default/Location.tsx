import type { Invitation } from "../../features/useGetInvitationData";
import { useKakaoMap } from "../../features/useKakaoMap";

function Location({ invitation }: { invitation: Invitation }) {
  console.log(invitation);
  const { mapRef } = useKakaoMap({
    lat: invitation.wedding_hall?.lat || 0,
    lng: invitation.wedding_hall?.lng || 0,
    level: 3,
  });

  // 내비게이션 앱 연동 함수들
  const openNaverMap = () => {
    const lat = invitation.wedding_hall?.lat;
    const lng = invitation.wedding_hall?.lng;
    const name = invitation.wedding_hall?.name || "";

    if (!lat || !lng) {
      alert("위치 정보가 없습니다.");
      return;
    }

    // 네이버지도 앱 URL 스킴 (모바일)
    const naverAppUrl = `nmap://place?lat=${lat}&lng=${lng}&name=${encodeURIComponent(
      name
    )}&appname=wedding-invitation`;

    // 네이버지도 웹 URL (PC 또는 앱이 없는 경우)
    const naverWebUrl = `https://map.naver.com/v5/search/${encodeURIComponent(
      name
    )}?c=${lng},${lat},15,0,0,0,dh`;

    // 모바일에서 앱 실행 시도, 실패하면 웹으로 이동
    if (
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      window.location.href = naverAppUrl;
      // 앱이 설치되지 않은 경우를 대비해 웹 URL로 fallback
      setTimeout(() => {
        window.open(naverWebUrl, "_blank");
      }, 1000);
    } else {
      window.open(naverWebUrl, "_blank");
    }
  };

  const openTmap = () => {
    const lat = invitation.wedding_hall?.lat;
    const lng = invitation.wedding_hall?.lng;
    const name = invitation.wedding_hall?.name || "목적지";

    if (!lat || !lng) {
      alert("위치 정보가 없습니다.");
      return;
    }

    // 티맵 앱 URL 스킴 (좌표 기반)
    const tmapAppUrl = `tmap://route?goalx=${lng}&goaly=${lat}&goalname=${encodeURIComponent(
      name
    )}`;

    // 티맵 웹 URL (좌표 기반)
    const tmapWebUrl = `https://tmap.life/route/search?goalX=${lng}&goalY=${lat}&goalName=${encodeURIComponent(
      name
    )}`;

    if (
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      window.location.href = tmapAppUrl;
      setTimeout(() => {
        window.open(tmapWebUrl, "_blank");
      }, 1000);
    } else {
      window.open(tmapWebUrl, "_blank");
    }
  };

  const openKakaoNavi = () => {
    const lat = invitation.wedding_hall?.lat;
    const lng = invitation.wedding_hall?.lng;
    const name = invitation.wedding_hall?.name || "";

    if (!lat || !lng) {
      alert("위치 정보가 없습니다.");
      return;
    }

    // 카카오내비 앱 URL 스킴
    const kakaoNaviUrl = `kakaonavi-sdk://navigate?destination=${lat},${lng}&destination_name=${encodeURIComponent(
      name
    )}`;

    // 카카오맵 웹 URL (카카오내비 앱이 없는 경우)
    const kakaoMapUrl = `https://map.kakao.com/link/to/${encodeURIComponent(
      name
    )},${lat},${lng}`;

    if (
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      window.location.href = kakaoNaviUrl;
      setTimeout(() => {
        window.open(kakaoMapUrl, "_blank");
      }, 1000);
    } else {
      window.open(kakaoMapUrl, "_blank");
    }
  };

  return (
    <section>
      <div className="my-11">
        <p className="text-2xl">{invitation.wedding_hall?.name}</p>
        <p className="opacity-70">{invitation.wedding_hall?.address}</p>
        <p className="opacity-70 text-sm mt-3">
          Tal. {invitation.wedding_hall?.phone}
        </p>
      </div>
      <div ref={mapRef} className="aspect-square bg-neutral-300"></div>
      <div className="text-left my-6 mx-4 md:mx-8">
        <div>
          <p>내비게이션</p>
          <p className="opacity-70 text-sm">
            원하시는 앱을 선택하시면 길 안내가 시작됩니다.
          </p>

          <div className="flex gap-2 justify-between my-4">
            <button
              type="button"
              className="default-btn"
              onClick={openNaverMap}
            >
              네이버지도
            </button>
            <button type="button" className="default-btn" onClick={openTmap}>
              티맵
            </button>
            <button
              type="button"
              className="default-btn"
              onClick={openKakaoNavi}
            >
              카카오내비
            </button>
          </div>
        </div>
        <div>
          <ul className="text-sm opacity-70">
            <li>지하철</li>
            <li>셔틀버스</li>
            <li>버스</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Location;
