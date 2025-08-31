import useCalendar, { DAY_LIST } from "../../features/useCalendar";
import useFormatKoreanTime from "../../features/useFormatKoreanTime";
import useWeddingDate from "../../features/useWeddingDate";

interface WeddingCalendarProps {
  weddingDate: string;
  weddingTime: string;
}

function Schedule({ weddingDate, weddingTime }: WeddingCalendarProps) {
  const weddingDay: number = new Date(weddingDate).getDate();

  const { weekCalendarList } = useCalendar(weddingDate);

  const { year, month, day, dayOfWeekKR } = useWeddingDate(weddingDate);

  const formattedTime: string = useFormatKoreanTime(weddingTime);

  return (
    <div className="w-3/4 mx-auto">
      <div className="my-4">
        <p className="text-lg ">
          {year}년 {month}월 {day}일
        </p>
        <p className=" opacity-70">
          {dayOfWeekKR} {formattedTime}
        </p>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAY_LIST.map((day: string, index: number) => (
          <div
            key={`day-${index}`}
            className={`text-center py-2 text-sm font-semibold ${
              index === 0
                ? "text-red-700"
                : index === 6
                ? "text-blue-700"
                : "text-gray-700"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="space-y-1">
        {weekCalendarList.map((week: number[], weekIndex: number) => (
          <div key={`week-${weekIndex}`} className="grid grid-cols-7 gap-1">
            {week.map((day: number, dayIndex: number) => {
              const isWeddingDay: boolean = day === weddingDay && day !== 0;
              const isWeekend: boolean = dayIndex === 0 || dayIndex === 6;
              const isSunday: boolean = dayIndex === 0;

              return (
                <div
                  key={`day-${weekIndex}-${dayIndex}`}
                  className={`
                    aspect-square flex items-center justify-center text-sm relative
                    ${day === 0 ? "invisible" : ""}
                    ${
                      isWeddingDay
                        ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white font-bold "
                        : "hover:bg-gray-100"
                    }
                    ${!isWeddingDay && isSunday ? "text-red-700" : ""}
                    ${!isWeddingDay && dayIndex === 6 ? "text-blue-700" : ""}
                    ${!isWeddingDay && !isWeekend ? "text-gray-700" : ""}
                    rounded-full transition-all duration-200
                  `}
                >
                  {day !== 0 && (
                    <span className={isWeddingDay ? "z-10" : ""}>{day}</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Schedule;
