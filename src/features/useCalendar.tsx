import { useState } from "react";

const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const CALENDER_LENGTH = 35;
const DEFAULT_TRASH_VALUE = 0;
const DAY_OF_WEEK = 7;

export const DAY_LIST: string[] = ["일", "월", "화", "수", "목", "금", "토"];

interface UseCalendarResult {
  weekCalendarList: number[][];
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const useCalendar = (date: string | Date): UseCalendarResult => {
  const [currentDate, setCurrentDate] = useState<Date>(
    typeof date === "string" ? new Date(date) : date
  );

  const totalMonthDays: number = getDaysInMonth(currentDate);

  const firstDayOfMonth: Date = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const prevDayList: number[] = Array.from({
    length: firstDayOfMonth.getDay(),
  }).map(() => DEFAULT_TRASH_VALUE);

  const currentDayList: number[] = Array.from({ length: totalMonthDays }).map(
    (_, i) => i + 1
  );

  const nextDayList: number[] = Array.from({
    length: CALENDER_LENGTH - currentDayList.length - prevDayList.length,
  }).map(() => DEFAULT_TRASH_VALUE);

  const currentCalendarList: number[] = prevDayList.concat(
    currentDayList,
    nextDayList
  );

  const weekCalendarList: number[][] = currentCalendarList.reduce<number[][]>(
    (acc, cur, idx) => {
      const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }
      acc[chunkIndex].push(cur);
      return acc;
    },
    []
  );

  return {
    weekCalendarList,
    currentDate,
    setCurrentDate,
  };
};

export default useCalendar;
