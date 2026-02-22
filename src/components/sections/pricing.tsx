type Plan = {
  name: string;
  price: string;
  description?: string;
  features?: string[];
  ctaText?: string;
  ctaLink?: string;
  highlighted?: boolean;
};

type PricingProps = {
  headline: string;
  subheadline?: string;
  plans?: Plan[];
};

export function PricingSection({
  headline,
  subheadline,
  plans = [],
}: PricingProps) {
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
      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`rounded-xl border p-8 ${
              plan.highlighted
                ? "border-zinc-900 ring-1 ring-zinc-900"
                : "border-zinc-200"
            }`}
          >
            <h3 className="text-lg font-semibold text-zinc-900">
              {plan.name}
            </h3>
            <p className="mt-4 text-3xl font-bold text-zinc-900">
              {plan.price}
            </p>
            {plan.description && (
              <p className="mt-2 text-sm text-zinc-600">{plan.description}</p>
            )}
            {plan.features && plan.features.length > 0 && (
              <ul className="mt-6 space-y-2">
                {plan.features.map((feature, j) => (
                  <li
                    key={j}
                    className="flex items-center text-sm text-zinc-600"
                  >
                    <span className="mr-2 text-zinc-400">&#10003;</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            {plan.ctaText && (
              <a
                href={plan.ctaLink || "#"}
                className={`mt-8 block rounded-md px-4 py-2.5 text-center text-sm font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-zinc-900 text-white hover:bg-zinc-700"
                    : "border border-zinc-300 text-zinc-900 hover:bg-zinc-50"
                }`}
              >
                {plan.ctaText}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
