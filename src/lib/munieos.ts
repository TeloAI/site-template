import { createClient } from "@munieos/sdk";

export type {
  ContentEntry,
  ContentModel,
  Page,
  BlogPost,
  SiteConfig,
  PageData,
  BlogPostData,
  SiteConfigData,
  ImageField,
} from "@munieos/sdk";

const client = createClient();

export { client };

export async function getPage(slug: string) {
  return client.getPage(slug);
}

export async function getPages() {
  return client.getPages({ status: "published" });
}

export async function getBlogPosts() {
  return client.getBlogPosts();
}

export async function getBlogPost(slug: string) {
  return client.getBlogPost(slug);
}

export async function getSiteConfig() {
  return client.getSiteConfig();
}

export async function getSections(entryIds: string[]) {
  return client.getSections(entryIds);
}
