export type EditorialStatus =
  | "draft"
  | "methodology-review"
  | "technical-review"
  | "approved"
  | "published";

export type ReliabilityLevel = "High" | "Medium" | "Indicative";

export interface ContentMeta {
  slug: string;
  title: string;
  description: string;
  status: EditorialStatus;
  author: string;
  reviewer?: string;
  publishedAt?: string;
  modifiedAt?: string;
  methodologyVersion?: string;
  reliability?: ReliabilityLevel;
  evidenceRefs?: string[];
  noindex?: boolean;
  category?: string;
  readingTime?: string;
  imageUrl?: string;
}

export interface ContentItem<T = Record<string, any>> {
  meta: ContentMeta & T;
  content: string;
}
