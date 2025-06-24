import React from 'react';
import Link from 'next/link';
import { DateDisplay } from './Date';
import { ProjectMetadata } from '@/projects/[slug]/page';

const ProjectPreview: React.FC<ProjectMetadata> = ({
  slug,
  title,
  date,
  dateFormat,
  excerpt,
}) => {
  return (
    <div>
      <h2>
        <Link href={`/projects/${slug}`}>{title}</Link>
      </h2>
      <DateDisplay date={date} dateFormat={dateFormat} />
      {excerpt && <p>{excerpt}</p>}
    </div>
  );
};

export default ProjectPreview;
