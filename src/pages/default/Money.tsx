import { useState } from "react";
import { useMoney } from "../../features/useMoney";
import type { FamilyMember } from "../../features/useGetInvitationData";

export const Money = ({ family }: { family: FamilyMember[] }) => {
  const { groomFamily, brideFamily } = useMoney(family);

  const [selectedSide, setSelectedSide] = useState<"groom" | "bride">("groom");

  // 계좌번호 복사 함수
  const copyAccount = async (accountNumber: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      alert("계좌번호가 복사되었습니다!");
    } catch (err) {
      alert("복사에 실패했습니다. 직접 입력해주세요.");
      console.log(err);
    }
  };

  // 토스 앱 실행 함수 (실패 시 복사 fallback)
  const openToss = (link: string, accountNumber: string) => {
    const timeout = setTimeout(() => {
      copyAccount(accountNumber);
    }, 1000);

    window.location.href = link;
    setTimeout(() => clearTimeout(timeout), 2000);
  };

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
          {/* 신랑측 */}
          <div className="w-1/2 p-4">
            {groomFamily.map((f) => (
              <div key={f.id} className="mb-4">
                <strong className="opacity-70">
                  {f.relation === "아버지" ? "부" : "모"}
                </strong>
                <span className="text-lg font-bold"> {f.displayName}</span>
                <br />

                {f.hasAccount && (
                  <>
                    <p
                      className="mb-2"
                      onClick={() => {
                        if (f.account_number) {
                          copyAccount(f.account_number);
                        }
                      }}
                    >
                      {f.bank_name} {f.account_holder} {f.account_number}
                    </p>
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-2 bg-blue-500 text-white rounded"
                        onClick={() => {
                          if (f.account_number) {
                            openToss(
                              `toss://send?bank=020&accountNo=${f.account_number}`,
                              f.account_number
                            );
                          } else {
                            alert("계좌번호가 없습니다.");
                          }
                        }}
                      >
                        토스페이
                      </button>
                      <button className="px-3 py-2 bg-gray-500 text-white rounded">
                        계좌번호 복사
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* 신부측 */}
          <div className="w-1/2 p-4">
            {brideFamily.map((f) => (
              <div key={f.id} className="mb-4">
                <strong>{f.relation}</strong>
                <span className="text-lg font-bold"> {f.displayName}</span>
                <br />

                {f.hasAccount && (
                  <>
                    <p
                      className="mb-2"
                      onClick={() => {
                        if (f.account_number) {
                          copyAccount(f.account_number);
                        }
                      }}
                    >
                      계좌: {f.bank_name} {f.account_holder} {f.account_number}
                    </p>
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-2 bg-blue-500 text-white rounded"
                        onClick={() => {
                          if (f.account_number) {
                            openToss(
                              `toss://send?bank=020&accountNo=${f.account_number}`,
                              f.account_number
                            );
                          } else {
                            alert("계좌번호가 없습니다.");
                          }
                        }}
                      >
                        토스페이
                      </button>
                    </div>
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
