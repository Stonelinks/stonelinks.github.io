import React from 'react';
import Link from 'next/link';
import { DateDisplay } from './Date';

export interface PostPreviewProps {
  slug: string;
  title: string;
  date: string;
  featuredImage?: string;
  tags?: string[];
  excerpt?: string;
}

const PostPreview: React.FC<PostPreviewProps> = ({
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
