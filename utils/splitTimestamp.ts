export default function splitTimestamp(timestamptz: string | Date): {
  date: string;
  month: string;
  year: string;
  time: string;
} {
  // Преобразуем входные данные к Date
  const dateObj =
    timestamptz instanceof Date ? timestamptz : new Date(timestamptz);

  // Безопасная проверка на NaN с помощью Number.isNaN
  if (Number.isNaN(dateObj.getTime())) {
    throw new Error("Invalid date provided to splitTimestamp");
  }

  const date = dateObj.getDate().toString().padStart(2, "0");

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear().toString();
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;

  return { date, month, year, time };
}
