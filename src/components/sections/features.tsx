type Feature = {
  title: string;
  description: string;
  icon?: string;
};

type FeaturesProps = {
  headline: string;
  subheadline?: string;
  features?: Feature[];
};

export function FeaturesSection({
  headline,
  subheadline,
  features = [],
}: FeaturesProps) {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          {headline}
        </h2>
        {subheadline && (
          <p className="mt-4 text-lg text-zinc-600">{subheadline}</p>
        )}
      </div>
      <div className="mx-auto mt-16 max-w-5xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div key={i} className="rounded-lg border border-zinc-200 p-6">
              <h3 className="text-lg font-semibold text-zinc-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
