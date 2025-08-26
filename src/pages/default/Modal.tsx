import { useState } from "react";
import FloatingInput from "../../components/default/FloatingInput";
import { useRsvp } from "../../features/useRSVP";
import type { RSVP } from "../../features/useGetInvitationData";

function Modal({
  invitationId,
  onClose,
}: {
  invitationId: string;
  onClose: () => void;
}) {
  const rsvpForm = useRsvp(invitationId);

  const [form, setForm] = useState<RSVP>({
    id: invitationId,
    genderFlag: null,
    attendance: false,
    name: "",
    phone: "",
    count: 1,
    meal: false,
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCount = (delta: number) => {
    setForm((prev) => ({
      ...prev,
      count: Math.max(1, prev.count + delta),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await rsvpForm.submitRsvp(form, (newRsvp) => {
      console.log("RSVP 등록 완료:", newRsvp);
      setForm({
        id: invitationId,
        genderFlag: null,
        attendance: false,
        name: "",
        phone: "",
        count: 1,
        meal: false,
        agree: false,
      });
    });

    if (success) {
      onClose();
    }
  };

  return (
    <div className="w-full py-6 px-4 md:px-8 max-h-[80vh] overflow-y-auto bg-white rounded-t-2xl shadow-lg">
      <p className="mb-4 font-medium text-lg">참석의사 전달</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 신랑/신부측 */}
        <div className="rounded-lg border border-black/40 flex overflow-hidden">
          <label className="w-full flex">
            <input
              type="radio"
              name="genderFlag"
              value="groom"
              onChange={handleChange}
              className="hidden peer"
            />
            <p className="flex-1 min-h-11 flex items-center justify-center text-black/40 bg-gray-200 peer-checked:bg-white peer-checked:text-[#111] transition-colors cursor-pointer border-r border-black/40">
              신랑측
            </p>
          </label>
          <label className="w-full flex">
            <input
              type="radio"
              name="genderFlag"
              value="bride"
              onChange={handleChange}
              className="hidden peer"
            />
            <p className="flex-1 min-h-11 flex items-center justify-center text-black/40 bg-gray-200 peer-checked:bg-white peer-checked:text-[#111] transition-colors cursor-pointer">
              신부측
            </p>
          </label>
        </div>

        {/* 참석 가능 여부 */}
        <div className="text-left">
          <p className="opacity-70 text-sm mb-2">
            신랑 & 신부에게 전달될 정보를 입력해주세요.
          </p>
          <div className="rounded-lg border border-black/40 flex overflow-hidden">
            <label className="w-full flex">
              <input
                type="radio"
                name="attendance"
                value={"true"}
                onChange={handleChange}
                className="hidden peer"
              />
              <p className="flex-1 min-h-11 flex items-center justify-center text-black/40 bg-gray-200 peer-checked:bg-white peer-checked:text-[#111] transition-colors cursor-pointer border-r border-black/40">
                방문 가능
              </p>
            </label>
            <label className="w-full flex">
              <input
                type="radio"
                name="attendance"
                value={"false"}
                onChange={handleChange}
                className="hidden peer"
              />
              <p className="flex-1 min-h-11 flex items-center justify-center text-black/40 bg-gray-200 peer-checked:bg-white peer-checked:text-[#111] transition-colors cursor-pointer">
                방문 불가
              </p>
            </label>
          </div>
        </div>

        <FloatingInput
          label="대표자 성함"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <FloatingInput
          label="연락처"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        {/* 총 인원 (Stepper) */}
        <div className="flex items-center justify-between border border-black/40 rounded-lg bg-gray-100 px-3 py-2">
          <span className="text-gray-700 text-sm">총 인원</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleCount(-1)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
            >
              -
            </button>
            <span className="w-6 text-center font-medium">{form.count}</span>
            <button
              type="button"
              onClick={() => handleCount(1)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>

        {/* 식사 여부 */}
        <div>
          <div className="rounded-lg border border-black/40 flex overflow-hidden">
            <label className="w-full flex">
              <input
                type="radio"
                name="meal"
                value="true"
                onChange={handleChange}
                className="hidden peer"
              />
              <p className="flex-1 min-h-11 flex items-center justify-center text-black/40 bg-gray-200 peer-checked:bg-white peer-checked:text-[#111] transition-colors cursor-pointer border-r border-black/40">
                식사함
              </p>
            </label>
            <label className="w-full flex">
              <input
                type="radio"
                name="meal"
                value="false"
                onChange={handleChange}
                className="hidden peer"
              />
              <p className="flex-1 min-h-11 flex items-center justify-center text-black/40 bg-gray-200 peer-checked:bg-white peer-checked:text-[#111] transition-colors cursor-pointer">
                식사 안함
              </p>
            </label>
          </div>
        </div>

        {/* 개인정보 이용 동의 */}
        <div className="text-left border border-[#111]/40 rounded-md px-4 py-3">
          <p className="text-lg"> (필수) 개인정보 수집 및 이용 동의</p>
          <p className="text-sm opacity-70 my-1">
            참석여부 전달을 위해 개인정보 수집 및 이용에 동의해주세요. <br />
            항목 : 성함, 연락처, 동행인원 <br />
            보유기간 : 청첩장 이용 종료시까지
          </p>
          <div className="flex items-center gap-1 my-2">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="mt-1"
            />
            <label htmlFor="agree" className="text-sm text-gray-700 ">
              동의합니다.
            </label>
          </div>
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={rsvpForm.submitting}
          className="w-full py-3 rounded-lg  border border-[#111]/40 font-medium hover:bg-black/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {rsvpForm.submitting ? "등록 중..." : "전달하기"}
        </button>
      </form>
    </div>
  );
}

export default Modal;
