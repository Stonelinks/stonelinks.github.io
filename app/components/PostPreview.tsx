import React from 'react';
import Link from 'next/link';
import { DateDisplay } from './Date';
import { PostMetadata } from '../../types';

const PostPreview: React.FC<PostMetadata> = ({
  slug,
  title,
  date,
  excerpt,
}) => {
  return (
    <div>
      <h2>
        <Link href={`/posts/${slug}`}>{title}</Link>
      </h2>
      <DateDisplay date={date} />
      {excerpt && <p>{excerpt}</p>}
    </div>
  );
};

export default PostPreview;
