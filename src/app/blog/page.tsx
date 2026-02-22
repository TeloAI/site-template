export default function BlogIndex() {
  // In production, fetch blog posts from the MunieOS CMS:
  //   const posts = await getBlogPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <p className="mt-4 text-zinc-600">
        Blog posts will be fetched from the MunieOS CMS. The Content Operator
        agent creates and publishes posts based on your content briefs.
      </p>
    </div>
  );
}
