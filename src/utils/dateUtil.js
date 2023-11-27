import { format } from 'date-fns';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
const DATE_FORMAT = 'YYYY-MM-DD ';

export function formatToDateTime(date: Date | number, formatStr = DATE_TIME_FORMAT) {
  return format(date, formatStr);
}

export function formatToDate(date: Date | number, formatStr = DATE_FORMAT) {
  return format(date, formatStr);
}
