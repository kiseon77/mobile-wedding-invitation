export default function useWeddingDate(wedding_date: string) {
  if (!wedding_date) {
    return { year: "", month: "", day: "", dayOfWeekKR: "", dayOfWeekEN: "" };
  }

  const date = new Date(wedding_date);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dayOfWeekKR = date.toLocaleDateString("ko-KR", { weekday: "long" });
  const dayOfWeekEN = date.toLocaleDateString("en-US", { weekday: "long" });

  return { year, month, day, dayOfWeekKR, dayOfWeekEN };
}
