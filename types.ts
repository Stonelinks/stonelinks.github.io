/**
 * Common types used across the application
 */

// Common metadata fields for both posts and projects
export interface BaseMetadata {
  slug: string;
  title: string;
  date?: string;
  featuredImage?: string;
  tags?: string[];
  gallery?: string[];
  excerpt?: string;
}

// Post-specific metadata extending the base metadata
export interface PostMetadata extends BaseMetadata {
  date: string; // Date is required for posts
}

// Project-specific metadata extending the base metadata
export interface ProjectMetadata extends BaseMetadata {
  dateFormat?: string; // Optional date format for projects
}

// Common component props
export interface TagListProps {
  tags: string[];
}

export interface LightboxProps {
  images: string[];
}

// Date component props
export interface DateDisplayProps {
  date?: string;
  dateFormat?: string;
}

// Common React component props
export interface ReactComponentProps {
  children?: React.ReactNode;
}
