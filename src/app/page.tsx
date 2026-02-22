import { getSection } from "@/components/sections/registry";

export default function HomePage() {
  // In production, this page fetches its content from the MunieOS CMS API:
  //   const page = await getPage("home");
  //   Then renders page.data.sections dynamically.
  //
  // For now, render a static placeholder that demonstrates the section system.

  const HeroSection = getSection("hero");
  const FeaturesSection = getSection("features");
  const CtaSection = getSection("cta");

  return (
    <>
      {HeroSection && (
        <HeroSection
          headline="Your website, operated by AI agents"
          subheadline="MunieOS continuously builds, optimises, and iterates on your marketing site. You own the code. Agents do the work."
          ctaText="Get started"
          ctaLink="/signup"
          layout="centered"
        />
      )}
      {FeaturesSection && (
        <FeaturesSection
          headline="What the agents do"
          subheadline="Six specialised agents, working continuously"
          features={[
            {
              title: "Content Operator",
              description:
                "Creates and publishes pages from your briefs. Updates content when your data changes.",
            },
            {
              title: "SEO Optimiser",
              description:
                "Monitors rankings, fixes meta tags, builds internal links. Reports in plain language.",
            },
            {
              title: "Performance Monitor",
              description:
                "Runs Lighthouse audits, optimises images, fixes speed issues automatically.",
            },
            {
              title: "A/B Test Runner",
              description:
                "Generates variants, splits traffic, promotes winners. Data-driven iteration.",
            },
            {
              title: "Competitive Watcher",
              description:
                "Monitors competitor sites for changes. Suggests counter-moves with draft content.",
            },
            {
              title: "Strategist",
              description:
                "Orchestrates all agents. Identifies patterns. Produces a weekly CMO-level report.",
            },
          ]}
        />
      )}
      {CtaSection && (
        <CtaSection
          headline="Ready to let agents run your marketing site?"
          subheadline="Your code. Your content. Our agents."
          ctaText="Start free"
          ctaLink="/signup"
          secondaryCtaText="See how it works"
          secondaryCtaLink="/demo"
        />
      )}
    </>
  );
}
