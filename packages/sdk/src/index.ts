export { MunieClient, MunieApiError } from "./client";
export type { MunieClientConfig } from "./client";
export { MunieLocalClient } from "./local";

export type {
  FieldType,
  FieldDefinition,
  ContentModel,
  ContentEntry,
  ImageField,
  FileField,
  Asset,
  QueryOpts,
  PageData,
  BlogPostData,
  AuthorData,
  SiteConfigData,
  Page,
  BlogPost,
  Author,
  SiteConfig,
} from "./types";

import { MunieClient } from "./client";
import { MunieLocalClient } from "./local";

export function createClient(): MunieClient | MunieLocalClient {
  const source = process.env.MUNIEOS_SOURCE || "api";

  if (source === "local") {
    const contentDir = process.env.MUNIEOS_CONTENT_DIR || "./content";
    return new MunieLocalClient(contentDir);
  }

  return new MunieClient({
    apiUrl: process.env.MUNIEOS_API_URL || "https://app.munieos.com/api/cms",
    apiKey: process.env.MUNIEOS_API_KEY || "",
    siteId: process.env.MUNIEOS_SITE_ID || "",
  });
}
