import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ContentItem, ContentMeta } from "./types";

const contentDirectory = path.join(process.cwd(), "content");

export function getContentBySlug(type: "research" | "resources" | "industries" | "comparisons", slug: string): ContentItem | null {
  try {
    const filePath = path.join(contentDirectory, type, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      meta: {
        slug,
        title: data.title || "",
        description: data.description || "",
        status: data.status || "draft",
        author: data.author || "ASTONTO Research Team",
        reviewer: data.reviewer,
        publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString().split("T")[0] : undefined,
        modifiedAt: data.modifiedAt ? new Date(data.modifiedAt).toISOString().split("T")[0] : undefined,
        methodologyVersion: data.methodologyVersion,
        reliability: data.reliability,
        evidenceRefs: data.evidenceRefs || [],
        noindex: data.noindex || false,
        category: data.category,
        readingTime: data.readingTime || "5 min read",
        ...data,
      } as ContentMeta,
      content,
    };
  } catch (error) {
    console.error(`Error reading ${type}/${slug}:`, error);
    return null;
  }
}

export function getAllContent(type: "research" | "resources" | "industries" | "comparisons"): ContentItem[] {
  try {
    const dirPath = path.join(contentDirectory, type);
    if (!fs.existsSync(dirPath)) {
      return [];
    }
    const files = fs.readdirSync(dirPath);
    const items = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const slug = file.replace(/\.md$/, "");
        return getContentBySlug(type, slug);
      })
      .filter((item): item is ContentItem => item !== null);

    return items.sort((a, b) => {
      if (!a.meta.publishedAt) return 1;
      if (!b.meta.publishedAt) return -1;
      return new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime();
    });
  } catch (error) {
    console.error(`Error reading all content for ${type}:`, error);
    return [];
  }
}
