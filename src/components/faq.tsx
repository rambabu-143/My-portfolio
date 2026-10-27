import JsonLd from "./json-ld";
import { faqs } from "@/lib/site";

// Visible Q&A (same text as the FAQPage JSON-LD) so search engines and AI answer engines can quote it.
const Faq = () => (
  <div className="w-full">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }} />
    <div className="flex items-baseline justify-between mb-8">
      <h2 className="font-display font-semibold text-3xl sm:text-4xl">About Rambabu, in short</h2>
      <span className="eyebrow hidden sm:block">06</span>
    </div>
    <div className="space-y-3">
      {faqs.map(({ q, a }) => (
        <details key={q} open className="glass rounded-2xl p-5 sm:p-6">
          <summary className="font-semibold cursor-pointer">{q}</summary>
          <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">{a}</p>
        </details>
      ))}
    </div>
  </div>
);

export default Faq;
