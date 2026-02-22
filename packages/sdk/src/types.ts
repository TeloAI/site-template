export type FieldType =
  | "text"
  | "longText"
  | "richText"
  | "number"
  | "boolean"
  | "date"
  | "image"
  | "file"
  | "color"
  | "url"
  | "email"
  | "enum"
  | "list"
  | "object"
  | "reference"
  | "json";

export type FieldDefinition = {
  name: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  fields?: FieldDefinition[];
  of?: { type: string; model?: string };
  model?: string;
  defaultValue?: unknown;
};

export type ContentModel = {
  id: string;
  siteId: string;
  name: string;
  displayName: string;
  fields: FieldDefinition[];
  isPage: boolean;
  isSection: boolean;
  singleton: boolean;
  slugField?: string | null;
  component?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ContentEntry<T extends Record<string, unknown> = Record<string, unknown>> = {
  id: string;
  modelId: string;
  siteId: string;
  slug: string | null;
  data: T;
  status: "draft" | "published";
  version: number;
  displayOrder: number | null;
  parentEntryId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ImageField = {
  assetId: string;
  url: string;
  alt?: string;
};

export type FileField = {
  assetId: string;
  url: string;
  filename: string;
};

export type Asset = {
  id: string;
  siteId: string;
  url: string;
  altText: string | null;
  filename: string;
  contentType: string;
  fileSize: number | null;
  width: number | null;
  height: number | null;
  variants: Record<string, string> | null;
  createdAt: string;
};

export type QueryOpts = {
  status?: "draft" | "published";
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDir?: "asc" | "desc";
};

// --- Convenience types for default models ---

export type PageData = {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: ImageField;
  sections: string[];
  status: "draft" | "published";
};

export type BlogPostData = {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  featuredImage?: ImageField;
  author?: string;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  status: "draft" | "published";
};

export type AuthorData = {
  name: string;
  avatar?: ImageField;
  bio?: string;
  role?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
};

export type SiteConfigData = {
  siteName: string;
  tagline?: string;
  logo?: ImageField;
  navigation?: Array<{ label: string; href: string }>;
  footer?: {
    copyright?: string;
    links?: Array<{ label: string; href: string }>;
  };
  brand?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontHeading?: string;
    fontBody?: string;
  };
  seo?: {
    defaultTitle?: string;
    titleTemplate?: string;
    defaultDescription?: string;
    defaultOgImage?: ImageField;
  };
};

export type Page = ContentEntry<PageData>;
export type BlogPost = ContentEntry<BlogPostData>;
export type Author = ContentEntry<AuthorData>;
export type SiteConfig = ContentEntry<SiteConfigData>;
