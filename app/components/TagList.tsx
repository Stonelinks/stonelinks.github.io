import Link from 'next/link';
import styles from './TagList.module.css';
import { TagListProps } from '../../types';

const TagList: React.FC<TagListProps> = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={styles.tagList}>
      {tags.map((tag, index) => (
        <Link
          className={styles.tag}
          key={index}
          href={`/tags/${encodeURIComponent(tag)}`}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
};

export default TagList;
