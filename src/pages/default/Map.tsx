import type { Invitation } from "../../features/useGetInvitationData";

function Map({ invitation }: { invitation: Invitation }) {
  return (
    <section>
      <div className="my-11">
        <p className="text-2xl">{invitation.wedding_hall?.name}</p>
        <p className="opacity-70">{invitation.wedding_hall?.address}</p>
        <p className="opacity-70 text-sm mt-3">
          Tal. {invitation.wedding_hall?.phone}
        </p>
      </div>
      <div className="aspect-square bg-neutral-300">지도</div>
      <div className="text-left my-6 mx-4 md:mx-8">
        <div>
          <p>내비게이션</p>
          <p className="opacity-70 text-sm">
            원하시는 앱을 선택하시면 길 안내가 시작됩니다.
          </p>

          <div className="flex gap-2 justify-between my-4">
            <button type="button" className=" default-btn">
              네이버지도
            </button>
            <button type="button" className=" default-btn">
              티맵
            </button>
            <button type="button" className=" default-btn">
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

export default Map;
