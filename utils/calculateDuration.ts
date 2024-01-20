export default function calculateDuration(startDate: string, endDate: string) {
  const start: any = new Date(startDate);
  const end: any = new Date(endDate);

  const timeDifference = Math.abs(end - start);

  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return `${daysDifference || 0} days`;
}