import { ClosingSection } from "@/components/ClosingSection";
import { DocumentarySection } from "@/components/DocumentarySection";
import { EverydaySection } from "@/components/EverydaySection";
import { FaqSection } from "@/components/FaqSection";
import { Hero } from "@/components/Hero";
import { LifeSection } from "@/components/LifeSection";
import { PathwaysSection } from "@/components/PathwaysSection";
import { PeopleSection } from "@/components/PeopleSection";
import { ProgressiveImageWarmup } from "@/components/ProgressiveImageWarmup";
import { RevealMotion } from "@/components/RevealMotion";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav, SkipLink } from "@/components/SiteNav";
import { WhySection } from "@/components/WhySection";
import { faq, people, site } from "@/lib/copy";
import { heroSharePhoto, peoplePhoto } from "@/lib/media";
import { siteUrl } from "@/lib/seo";

export default function Home() {
  const organizationId = `${siteUrl}#organization`;
  const danielId = `${siteUrl}#person-daniel`;
  const andreaId = `${siteUrl}#person-andrea`;
  const logoUrl = new URL("/logo-lockup-green.png", siteUrl).toString();
  const heroImageUrl = new URL(heroSharePhoto.src, siteUrl).toString();
  const [daniel, andrea] = people.profiles;
  const peopleImageUrl = new URL(peoplePhoto.src, siteUrl).toString();

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
        publisher: { "@id": organizationId },
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        url: siteUrl.toString(),
        description: site.description,
        logo: logoUrl,
        image: heroImageUrl,
        founder: { "@id": danielId },
        member: [{ "@id": danielId }, { "@id": andreaId }],
      },
      {
        "@type": "Person",
        "@id": danielId,
        name: daniel.name,
        description: daniel.bio,
        image: peopleImageUrl,
        jobTitle: "Founder",
        worksFor: { "@id": organizationId },
      },
      {
        "@type": "Person",
        "@id": andreaId,
        name: andrea.name,
        description: andrea.bio,
        image: peopleImageUrl,
        worksFor: { "@id": organizationId },
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
      <ProgressiveImageWarmup />
      <main>
        <Hero />
        <SiteNav />
        <LifeSection />
        <WhySection />
        <DocumentarySection />
        <EverydaySection />
        <PathwaysSection />
        <FaqSection />
        <PeopleSection />
        <ClosingSection />
      </main>
      <SiteFooter />
    </>
  );
}
