import { useState } from "react";
import { useMoney } from "../../features/useMoney";
import type { FamilyMember } from "../../features/useGetInvitationData";

export const Money = ({ family }: { family: FamilyMember[] }) => {
  const { groomFamily, brideFamily } = useMoney(family);

  const [selectedSide, setSelectedSide] = useState<"groom" | "bride">("groom");

  return (
    <div className="my-10">
      <div className="my-8">
        <p className="text-2xl my-2">마음 전하실 곳</p>
        <p className="opacity-70">
          참석이 어려우신 분들을 위해 <br />
          계좌번호를 기재하였습니다. <br />
          너그러운 마음으로 양해 부탁드립니다.
        </p>
      </div>
      <div className="w-3/4 mx-auto rounded-lg border border-black/40 flex overflow-hidden">
        {["groom", "bride"].map((side) => (
          <label key={side} className="w-full flex">
            <input
              type="radio"
              name="genderFlag"
              value={side}
              checked={selectedSide === side}
              onChange={() => setSelectedSide(side as "groom" | "bride")}
              className="hidden"
            />
            <p
              className={`flex-1 min-h-11 flex items-center justify-center transition-colors cursor-pointer border-r border-black/40 ${
                selectedSide === side
                  ? "bg-white text-[#111]"
                  : "bg-gray-200 text-black/40"
              }`}
            >
              {side === "groom" ? "신랑측" : "신부측"}
            </p>
          </label>
        ))}
      </div>
      <div className="w-full overflow-hidden mt-8">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform:
              selectedSide === "groom" ? "translateX(0%)" : "translateX(-50%)",
            width: "200%",
          }}
        >
          <div className="w-1/2 p-4">
            {groomFamily.map((f) => (
              <div key={f.id} className="mb-2">
                <strong>{f.relation}</strong>: {f.displayName}
                <br />
                연락처: {f.contact_phone ?? "-"}
                <br />
                {f.hasAccount && (
                  <>
                    계좌: {f.bank_name} {f.account_holder} {f.account_number}
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="w-1/2 p-4">
            {brideFamily.map((f) => (
              <div key={f.id} className="mb-2">
                <strong>{f.relation}</strong>: {f.displayName}
                <br />
                연락처: {f.contact_phone ?? "-"}
                <br />
                {f.hasAccount && (
                  <>
                    계좌: {f.bank_name} {f.account_holder} {f.account_number}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
