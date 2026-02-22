type CtaProps = {
  headline: string;
  subheadline?: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
};

export function CtaSection({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
}: CtaProps) {
  return (
    <section className="bg-zinc-900 px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {headline}
        </h2>
        {subheadline && (
          <p className="mt-4 text-lg text-zinc-300">{subheadline}</p>
        )}
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href={ctaLink}
            className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition-colors hover:bg-zinc-100"
          >
            {ctaText}
          </a>
          {secondaryCtaText && (
            <a
              href={secondaryCtaLink || "#"}
              className="text-sm font-semibold text-white transition-colors hover:text-zinc-300"
            >
              {secondaryCtaText} &rarr;
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
