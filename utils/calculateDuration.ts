import { Timestamp } from "firebase/firestore";

interface DateRange {
  start: Timestamp;
  end: Timestamp;
}

export const calculateDuration = (dateRange: DateRange): string => {
  const startTimestamp = dateRange.start.toDate().getTime();
  const endTimestamp = dateRange.end.toDate().getTime();
  const durationInMilliseconds = endTimestamp - startTimestamp;
  const durationInDays = Math.floor(durationInMilliseconds / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  if (durationInDays === 1) {
    return '1 day';
  } else {
    return `${durationInDays} days`;
  }
};
