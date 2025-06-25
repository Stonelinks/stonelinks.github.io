import React from 'react';
import Link from 'next/link';
import { DateDisplay } from './Date';
import { ProjectMetadata } from '../../types';
import Image from 'next/image';

const ProjectPreview: React.FC<ProjectMetadata> = ({
  slug,
  title,
  date,
  dateFormat,
  excerpt,
  featuredImage,
}) => {
  return (
    <div className="pb-4">
      <h2>
        <Link href={`/projects/${slug}`}>{title}</Link>
      </h2>
      <DateDisplay date={date} dateFormat={dateFormat} />
      <div className="flex items-center space-x-4 mb-8">
        {featuredImage && (
          <Image src={featuredImage} width={100} height={100} alt={title} />
        )}
        {excerpt && <p>{excerpt}</p>}
      </div>
    </div>
  );
};

export default ProjectPreview;
