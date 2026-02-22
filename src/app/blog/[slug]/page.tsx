type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPost({ params }: PostPageProps) {
  const { slug } = await params;

  // In production, fetch the blog post from the MunieOS CMS:
  //   const post = await getEntryBySlug("blog-post", slug);
  //   if (!post) return notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight">{slug}</h1>
      <p className="mt-4 text-zinc-600">
        This blog post will be rendered from CMS content.
      </p>
    </article>
  );
}
