export default function useFormatKoreanTime(timeStr: string): string {
  const [hourStr, minuteStr] = timeStr.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  let period = "";
  let displayHour = hour;

  if (hour === 0) {
    period = "자정";
    displayHour = 12;
  } else if (hour < 6) {
    period = "새벽";
    displayHour = hour;
  } else if (hour < 12) {
    period = "오전";
    displayHour = hour;
  } else if (hour === 12) {
    period = "정오";
    displayHour = 12;
  } else if (hour < 18) {
    period = "낮";
    displayHour = hour - 12;
  } else if (hour < 21) {
    period = "저녁";
    displayHour = hour - 12;
  } else {
    period = "밤";
    displayHour = hour - 12;
  }

  let result = `${period} ${displayHour}시`;
  if (minute > 0) {
    result += ` ${minute}분`;
  }

  return result;
}
