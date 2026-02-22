import type { ComponentType } from "react";
import { HeroSection } from "./hero";
import { FeaturesSection } from "./features";
import { PricingSection } from "./pricing";
import { TestimonialsSection } from "./testimonials";
import { CtaSection } from "./cta";
import { FaqSection } from "./faq";

// Maps CMS section model component names to React components.
// When agents create new section types, they register them here.
const sectionRegistry: Record<string, ComponentType<Record<string, unknown>>> = {
  hero: HeroSection as ComponentType<Record<string, unknown>>,
  features: FeaturesSection as ComponentType<Record<string, unknown>>,
  pricing: PricingSection as ComponentType<Record<string, unknown>>,
  testimonials: TestimonialsSection as ComponentType<Record<string, unknown>>,
  cta: CtaSection as ComponentType<Record<string, unknown>>,
  faq: FaqSection as ComponentType<Record<string, unknown>>,
};

export function getSection(
  componentName: string
): ComponentType<Record<string, unknown>> | null {
  return sectionRegistry[componentName] ?? null;
}

export function listSections(): string[] {
  return Object.keys(sectionRegistry);
}
