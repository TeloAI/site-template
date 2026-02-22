type FaqItem = {
  question: string;
  answer: string;
};

type FaqProps = {
  headline?: string;
  items?: FaqItem[];
};

export function FaqSection({ headline, items = [] }: FaqProps) {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-8">
      {headline && (
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {headline}
          </h2>
        </div>
      )}
      <div className="mx-auto mt-16 max-w-3xl">
        <dl className="space-y-8">
          {items.map((item, i) => (
            <div key={i}>
              <dt className="text-base font-semibold text-zinc-900">
                {item.question}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-600">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
