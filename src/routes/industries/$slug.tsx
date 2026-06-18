import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero, Section, SectionHeader } from "@/components/site/Section";
import { industries, products } from "@/data/products";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = industries.find((i) => i.slug === params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.industry.name ?? "Industry"} — Kohinoor Polytech` },
      { name: "description", content: loaderData?.industry.blurb ?? "" },
      { property: "og:title", content: `${loaderData?.industry.name} polymer solutions` },
      { property: "og:description", content: loaderData?.industry.blurb ?? "" },
    ],
  }),
  component: IndustryDetail,
  notFoundComponent: () => <div className="pt-40 text-center">Industry not found.</div>,
  errorComponent: () => <div className="pt-40 text-center">Something went wrong.</div>,
});

function IndustryDetail() {
  const { industry } = Route.useLoaderData();
  const productsForIndustry = products.slice(0, 4);
  return (
    <>
      <section className="pt-40 pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/industries" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to industries</Link>
          <div className="chip mt-8 mb-5">Industry</div>
          <h1 className="text-5xl md:text-7xl font-medium leading-[0.95]">{industry.name}</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{industry.blurb}</p>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-7">
            <div className="text-xs uppercase tracking-widest text-brand-cyan">Challenges</div>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>· Tight tolerances on MFI and dimensional stability</li>
              <li>· Demanding aesthetic standards for finished parts</li>
              <li>· Pressure to incorporate recycled content without quality loss</li>
              <li>· High volume production with consistent supply</li>
            </ul>
          </div>
          <div className="glass rounded-2xl p-7">
            <div className="text-xs uppercase tracking-widest text-brand-cyan">Our solutions</div>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>· Application-tuned PPHP and PPCP grades</li>
              <li>· Custom colour development with batch consistency</li>
              <li>· Up to 100% PCR options meeting OEM specifications</li>
              <li>· Dedicated technical account management</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <SectionHeader eyebrow="Recommended grades" title={`Products commonly used in ${industry.name.toLowerCase()}.`} />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {productsForIndustry.map((p) => (
            <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between"><span className="chip">{p.category}</span><span className="h-6 w-6 rounded-full ring-2 ring-white/20" style={{ background: p.swatch }} /></div>
              <div className="mt-4 font-medium">{p.name}</div>
              <div className="mt-2 text-xs text-muted-foreground font-num">MFI {p.mfi}</div>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <SectionHeader eyebrow="Case study" title={`How a ${industry.name.toLowerCase()} leader cut cost by 18%.`} />
        <div className="glass rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div><div className="text-xs uppercase tracking-widest text-brand-cyan">Problem</div><p className="mt-2 text-sm text-muted-foreground">Inconsistent virgin polymer supply caused production downtime and material costs were climbing.</p></div>
            <div><div className="text-xs uppercase tracking-widest text-brand-cyan">Solution</div><p className="mt-2 text-sm text-muted-foreground">Co-engineered a custom PPCP compound with 70% PCR content matched to existing tooling.</p></div>
            <div><div className="text-xs uppercase tracking-widest text-brand-cyan">Result</div><p className="mt-2 text-sm text-muted-foreground">18% material-cost reduction, zero quality complaints, 100% supply continuity over 24 months.</p></div>
          </div>
        </div>
      </Section>
    </>
  );
}
