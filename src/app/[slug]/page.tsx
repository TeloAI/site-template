import { getSection } from "@/components/sections/registry";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;

  // In production, fetch page data from the MunieOS CMS:
  //   const page = await getPage(slug);
  //   if (!page) return notFound();
  //   Then render page.data.sections dynamically using the registry.

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight">/{slug}</h1>
      <p className="mt-4 text-zinc-600">
        This page will be dynamically rendered from CMS content. The agent will
        create sections for this page via the MunieOS CMS API.
      </p>
    </div>
  );
}
