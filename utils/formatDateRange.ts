import moment from 'moment';

interface DateRange {
  start: Date;
  end: Date;
}

export const formatDateRange = (dateRange: any): string => {
  const startDate = dateRange.start.toDate();
  const endDate = dateRange.end.toDate();

  const formatedStartDate = moment(startDate).format('D.MM.YYYY');
  const formatedEndDate = moment(endDate).format('D.MM.YYYY');
  return `${formatedStartDate} - ${formatedEndDate}`;
};
