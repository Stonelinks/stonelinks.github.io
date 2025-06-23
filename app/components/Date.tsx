import commonStyles from './common.module.css';
import { format } from 'date-fns';

export const DateDisplay = ({ date }: { date?: string }) => {
  return (
    <p className={commonStyles.date}>
      {date ? format(new Date(date), 'MMMM d, yyyy') : 'Date unknown'}
    </p>
  );
};
