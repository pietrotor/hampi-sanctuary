import { ClosingSection } from "@/components/ClosingSection";
import { DocumentarySection } from "@/components/DocumentarySection";
import { EverydaySection } from "@/components/EverydaySection";
import { FaqSection } from "@/components/FaqSection";
import { Hero } from "@/components/Hero";
import { LifeSection } from "@/components/LifeSection";
import { PathwaysSection } from "@/components/PathwaysSection";
import { PeopleSection } from "@/components/PeopleSection";
import { RevealMotion } from "@/components/RevealMotion";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav, SkipLink } from "@/components/SiteNav";
import { ThriveSection } from "@/components/ThriveSection";
import { WhySection } from "@/components/WhySection";
import { faq, site } from "@/lib/copy";
import { siteUrl } from "@/lib/seo";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl.toString(),
        name: site.name,
        description: site.shortDescription,
        inLanguage: "en",
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: site.name,
        url: siteUrl.toString(),
        description: site.description,
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}#faq`,
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <SkipLink />
      <RevealMotion />
      <main>
        <Hero />
        <SiteNav />
        <LifeSection />
        <WhySection />
        <DocumentarySection />
        <EverydaySection />
        <PathwaysSection />
        <ThriveSection />
        <FaqSection />
        <PeopleSection />
        <ClosingSection />
      </main>
      <SiteFooter />
    </>
  );
}
