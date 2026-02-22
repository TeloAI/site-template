import type {
  ContentEntry,
  ContentModel,
  QueryOpts,
  Page,
  BlogPost,
  SiteConfig,
} from "./types";

/**
 * Local content source for exported/standalone sites.
 * Reads content from JSON files in a content/ directory.
 *
 * Directory structure (created by the export tool):
 *   content/
 *     _models.json            # Array of ContentModel definitions
 *     pages/
 *       home.json             # ContentEntry
 *       pricing.json
 *     blog-posts/
 *       my-first-post.json
 *     authors/
 *       jane-doe.json
 *     site-config/
 *       default.json
 */

export class MunieLocalClient {
  constructor(private contentDir: string) {}

  private async readJson<T>(path: string): Promise<T> {
    const fs = await import("fs/promises");
    const raw = await fs.readFile(path, "utf-8");
    return JSON.parse(raw) as T;
  }

  private async readDir(dir: string): Promise<string[]> {
    const fs = await import("fs/promises");
    const path = await import("path");
    try {
      const files = await fs.readdir(dir);
      return files
        .filter((f) => f.endsWith(".json"))
        .map((f) => path.join(dir, f));
    } catch {
      return [];
    }
  }

  private modelDir(modelName: string): string {
    return `${this.contentDir}/${modelName}s`;
  }

  // --- Models ---

  async listModels(): Promise<ContentModel[]> {
    return this.readJson(`${this.contentDir}/_models.json`);
  }

  // --- Entries ---

  async getEntries<T extends Record<string, unknown> = Record<string, unknown>>(
    modelName: string,
    opts?: QueryOpts
  ): Promise<ContentEntry<T>[]> {
    const files = await this.readDir(this.modelDir(modelName));
    const entries: ContentEntry<T>[] = [];

    for (const file of files) {
      const entry = await this.readJson<ContentEntry<T>>(file);
      if (opts?.status && entry.status !== opts.status) continue;
      entries.push(entry);
    }

    if (opts?.limit) {
      const offset = opts.offset ?? 0;
      return entries.slice(offset, offset + opts.limit);
    }

    return entries;
  }

  async getEntryBySlug<T extends Record<string, unknown> = Record<string, unknown>>(
    modelName: string,
    slug: string
  ): Promise<ContentEntry<T> | null> {
    try {
      return await this.readJson(`${this.modelDir(modelName)}/${slug}.json`);
    } catch {
      return null;
    }
  }

  // --- Convenience ---

  async getPage(slug: string): Promise<Page | null> {
    return this.getEntryBySlug("page", slug);
  }

  async getPages(opts?: QueryOpts): Promise<Page[]> {
    return this.getEntries("page", opts);
  }

  async getBlogPosts(opts?: QueryOpts): Promise<BlogPost[]> {
    return this.getEntries("blog-post", { status: "published", ...opts });
  }

  async getBlogPost(slug: string): Promise<BlogPost | null> {
    return this.getEntryBySlug("blog-post", slug);
  }

  async getSiteConfig(): Promise<SiteConfig | null> {
    const entries = await this.getEntries<SiteConfig["data"]>("site-config");
    return entries[0] ?? null;
  }

  async getSections(entryIds: string[]): Promise<ContentEntry[]> {
    const models = await this.listModels();
    const sectionModels = models.filter((m) => m.isSection);

    const results: ContentEntry[] = [];
    for (const model of sectionModels) {
      const entries = await this.getEntries(model.name);
      for (const entry of entries) {
        if (entryIds.includes(entry.id)) {
          results.push(entry);
        }
      }
    }

    return results.sort(
      (a, b) => entryIds.indexOf(a.id) - entryIds.indexOf(b.id)
    );
  }
}
