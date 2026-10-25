import { PageFrame } from "@/components/layout/PageFrame";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Story } from "@/components/sections/Story";
import { Work } from "@/components/sections/Work";
import { person, site } from "@/content/profile";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.role,
  email: `mailto:${person.email}`,
  description: site.description,
  address: { "@type": "PostalAddress", addressCountry: "IL" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "The Open University" },
  knowsLanguage: person.languages.map((l) => l.name),
  ...(person.linkedin ? { sameAs: [person.linkedin] } : {}),
};

export default function Home() {
  return (
    <>
      <PageFrame />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Story />
        <Experience />
        <Skills />
        <Education />
        <Work />
        <Contact />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
