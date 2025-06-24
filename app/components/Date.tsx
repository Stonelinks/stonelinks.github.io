import commonStyles from './common.module.css';
import { format } from 'date-fns';

export const DateDisplay = ({
  date,
  dateFormat,
}: {
  date?: string;
  dateFormat?: string;
}) => {
  let df = 'MMMM d, yyyy';
  if (dateFormat) {
    df = dateFormat;
  }

  return (
    <p className={commonStyles.date}>
      {date ? format(new Date(date), df) : 'Date unknown'}
    </p>
  );
};
