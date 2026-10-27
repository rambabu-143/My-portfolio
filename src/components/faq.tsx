import JsonLd from "./json-ld";
import { faqs } from "@/lib/site";

// Plain visible about text (same Q&A as the FAQPage JSON-LD) so search engines and AI answer engines can quote it.
const Faq = () => (
  <div className="w-full">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }} />
    <div className="flex items-baseline justify-between mb-8">
      <h2 className="font-display font-semibold text-3xl sm:text-4xl">About</h2>
      <span className="eyebrow hidden sm:block">06</span>
    </div>
    <div className="max-w-3xl space-y-4 text-[15px] sm:text-base leading-relaxed text-foreground/80">
      {faqs.map(({ q, a }) => <p key={q}>{a}</p>)}
    </div>
  </div>
);

export default Faq;
