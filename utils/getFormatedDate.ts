export default function getFormatedDate(inputDate: string) {
  const date: Date = new Date(inputDate);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

  return `${inputDate ? formattedDate : "00.00.00"}`;
}