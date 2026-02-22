type HeroProps = {
  headline: string;
  subheadline?: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: { url: string; alt?: string };
  layout?: "centered" | "left-aligned" | "split";
};

export function HeroSection({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  layout = "centered",
}: HeroProps) {
  const alignmentClass =
    layout === "centered" ? "text-center items-center" : "text-left items-start";

  return (
    <section className="relative px-6 py-24 sm:py-32 lg:px-8">
      <div className={`mx-auto max-w-2xl flex flex-col ${alignmentClass}`}>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
          {headline}
        </h1>
        {subheadline && (
          <p className="mt-6 text-lg leading-8 text-zinc-600">{subheadline}</p>
        )}
        <div className="mt-10">
          <a
            href={ctaLink}
            className="rounded-md bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-700"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
