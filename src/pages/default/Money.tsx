export const Money = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
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
    </div>
  );
};
