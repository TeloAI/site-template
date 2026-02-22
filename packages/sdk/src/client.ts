import type {
  ContentEntry,
  ContentModel,
  QueryOpts,
  Page,
  BlogPost,
  SiteConfig,
} from "./types";

export type MunieClientConfig = {
  apiUrl: string;
  apiKey: string;
  siteId: string;
};

export class MunieClient {
  private config: MunieClientConfig;

  constructor(config: MunieClientConfig) {
    this.config = config;
  }

  private async fetch<T>(path: string, init?: RequestInit): Promise<T> {
    const url = `${this.config.apiUrl}${path}`;
    const res = await fetch(url, {
      ...init,
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new MunieApiError(res.status, `${res.statusText}: ${body}`);
    }

    return res.json() as Promise<T>;
  }

  // --- Models ---

  async listModels(): Promise<ContentModel[]> {
    return this.fetch(`/models?siteId=${this.config.siteId}`);
  }

  async getModel(modelId: string): Promise<ContentModel> {
    return this.fetch(`/models?modelId=${modelId}`);
  }

  // --- Entries (generic) ---

  async getEntries<T extends Record<string, unknown> = Record<string, unknown>>(
    modelId: string,
    opts?: QueryOpts
  ): Promise<ContentEntry<T>[]> {
    const params = new URLSearchParams({
      siteId: this.config.siteId,
      modelId,
    });
    if (opts?.status) params.set("status", opts.status);
    if (opts?.limit) params.set("limit", String(opts.limit));
    if (opts?.offset) params.set("offset", String(opts.offset));

    return this.fetch(`/entries?${params}`);
  }

  async getEntry<T extends Record<string, unknown> = Record<string, unknown>>(
    entryId: string
  ): Promise<ContentEntry<T>> {
    return this.fetch(`/entries?entryId=${entryId}`);
  }

  async getEntryBySlug<T extends Record<string, unknown> = Record<string, unknown>>(
    modelId: string,
    slug: string
  ): Promise<ContentEntry<T> | null> {
    const params = new URLSearchParams({
      siteId: this.config.siteId,
      modelId,
      slug,
    });

    try {
      return await this.fetch(`/entries?${params}`);
    } catch (err) {
      if (err instanceof MunieApiError && err.status === 404) return null;
      throw err;
    }
  }

  // --- Convenience: Pages ---

  async getPage(slug: string): Promise<Page | null> {
    const pageModel = await this.findModelByName("page");
    if (!pageModel) return null;
    return this.getEntryBySlug(pageModel.id, slug);
  }

  async getPages(opts?: QueryOpts): Promise<Page[]> {
    const pageModel = await this.findModelByName("page");
    if (!pageModel) return [];
    return this.getEntries(pageModel.id, opts);
  }

  // --- Convenience: Blog Posts ---

  async getBlogPosts(opts?: QueryOpts): Promise<BlogPost[]> {
    const model = await this.findModelByName("blog-post");
    if (!model) return [];
    return this.getEntries(model.id, { status: "published", ...opts });
  }

  async getBlogPost(slug: string): Promise<BlogPost | null> {
    const model = await this.findModelByName("blog-post");
    if (!model) return null;
    return this.getEntryBySlug(model.id, slug);
  }

  // --- Convenience: Site Config ---

  async getSiteConfig(): Promise<SiteConfig | null> {
    const model = await this.findModelByName("site-config");
    if (!model) return null;
    const entries = await this.getEntries<SiteConfig["data"]>(model.id);
    return entries[0] ?? null;
  }

  // --- Convenience: Sections ---

  async getSections(entryIds: string[]): Promise<ContentEntry[]> {
    const results = await Promise.all(
      entryIds.map((id) => this.getEntry(id).catch(() => null))
    );
    return results.filter((r): r is ContentEntry => r !== null);
  }

  // --- Helpers ---

  private modelCache = new Map<string, ContentModel>();

  private async findModelByName(name: string): Promise<ContentModel | null> {
    if (this.modelCache.has(name)) {
      return this.modelCache.get(name)!;
    }

    const models = await this.listModels();
    for (const m of models) {
      this.modelCache.set(m.name, m);
    }

    return this.modelCache.get(name) ?? null;
  }
}

export class MunieApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "MunieApiError";
  }
}
