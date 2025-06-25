import Link from 'next/link';
import { TagListProps } from '../../types';

const TagList: React.FC<TagListProps> = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag, index) => (
        <Link
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded px-2.5 py-0.5"
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
