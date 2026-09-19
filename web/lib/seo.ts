import type { Metadata } from "next";

export const siteConfig = {
  name: "Niraj Public School",
  shortName: "NPS",
  description:
    "Niraj Public School nurtures curious minds, compassionate hearts and confident leaders for a brighter tomorrow.",
  url: "https://www.nirajpublicschool.example", // TODO: replace with the real production domain once decided
};

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s — ${siteConfig.name}`,
    },
    description: siteConfig.description,
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
    },
    ...overrides,
  };
}

export function schoolJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}
