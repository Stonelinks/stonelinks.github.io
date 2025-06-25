import { format } from 'date-fns';
import { DateDisplayProps } from '../../types';

export const dateToString = (date: Date, dateFormat?: string) => {
  let df = 'MMMM d, yyyy';
  if (dateFormat) {
    df = dateFormat;
  }

  return format(date, df);
};

export const DateDisplay = ({ date, dateFormat }: DateDisplayProps) => {
  return (
    <p className="text-sm text-gray-500 mt-0 mb-4">
      {date ? dateToString(new Date(date), dateFormat) : 'Date unknown'}
    </p>
  );
};
