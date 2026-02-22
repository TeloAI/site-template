type Testimonial = {
  quote: string;
  authorName: string;
  authorRole?: string;
  authorCompany?: string;
};

type TestimonialsProps = {
  headline?: string;
  testimonials?: Testimonial[];
};

export function TestimonialsSection({
  headline,
  testimonials = [],
}: TestimonialsProps) {
  return (
    <section className="bg-zinc-50 px-6 py-24 sm:py-32 lg:px-8">
      {headline && (
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {headline}
          </h2>
        </div>
      )}
      <div className="mx-auto mt-16 max-w-5xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={i} className="rounded-lg border border-zinc-200 bg-white p-6">
              <blockquote className="text-sm leading-relaxed text-zinc-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4">
                <p className="text-sm font-semibold text-zinc-900">
                  {t.authorName}
                </p>
                {(t.authorRole || t.authorCompany) && (
                  <p className="text-xs text-zinc-500">
                    {[t.authorRole, t.authorCompany].filter(Boolean).join(", ")}
                  </p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
