import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeader } from "@/components/site/Section";
import { Leaf, Recycle, Droplet, Sun, Wind, Factory } from "lucide-react";

export const Route = createFileRoute("/sustainability")({
  head: () => ({
    meta: [
      { title: "Sustainability — Kohinoor Polytech" },
      { name: "description", content: "Our ESG commitments, circular-economy programmes and environmental impact metrics." },
      { property: "og:title", content: "Sustainability at Kohinoor Polytech" },
      { property: "og:description", content: "Measurable progress toward a circular polymer economy." },
    ],
  }),
  component: Sustainability,
});

function Sustainability() {
  return (
    <>
      <PageHero
        eyebrow="Sustainability"
        title={<>Engineering a <span className="text-gradient">circular polymer economy</span>.</>}
        sub="Every kilogram of polymer we ship is one less kilogram in landfill. Here's how we measure progress."
      />
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { i: Recycle, k: "14,000 T", l: "Plastic waste recycled annually" },
            { i: Wind, k: "32,000 T", l: "CO₂ emissions avoided" },
            { i: Droplet, k: "85%", l: "Water reused in closed loops" },
            { i: Sun, k: "40%", l: "Energy from renewables (2026 target)" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl p-6 relative overflow-hidden">
              <s.i className="h-7 w-7 text-brand-green" />
              <div className="font-num text-3xl md:text-4xl font-semibold text-gradient mt-4">{s.k}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <SectionHeader eyebrow="ESG framework" title="Environmental, social and governance commitments." />
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { t: "Environmental", d: "Net-zero roadmap by 2040 · Closed-loop water · Renewable energy transition · Zero process waste to landfill." },
            { t: "Social", d: "Worker safety certified · Fair-wage policies · Local hiring initiatives · Skill development partnerships." },
            { t: "Governance", d: "Independent ESG audits · Transparent reporting · Anti-corruption policy · Board-level sustainability committee." },
          ].map((b) => (
            <div key={b.t} className="glass rounded-2xl p-7">
              <Leaf className="h-7 w-7 text-brand-green" />
              <div className="mt-4 text-xl font-medium">{b.t}</div>
              <p className="mt-3 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <SectionHeader eyebrow="Circular timeline" title="From waste stream to industrial product." />
        <div className="relative pl-6 border-l border-white/10 space-y-8">
          {[
            { t: "Sourcing", d: "Certified post-consumer and post-industrial PP collected through EPR-aligned partners." },
            { t: "Sorting", d: "Optical and density-based sorting separates streams by grade and colour." },
            { t: "Processing", d: "Multi-stage washing, drying and devolatilisation removes contaminants." },
            { t: "Compounding", d: "Twin-screw extrusion with in-line MFI control yields uniform pellets." },
            { t: "Distribution", d: "Containerised shipping to OEMs and converters across India and export markets." },
            { t: "Re-loop", d: "End-of-life products re-enter our supply chain, closing the cycle." },
          ].map((m, i) => (
            <div key={m.t} className="relative">
              <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-brand-green ring-4 ring-brand-green/20" />
              <div className="font-num text-brand-green tracking-widest text-sm">STAGE {String(i+1).padStart(2,"0")}</div>
              <div className="mt-1 text-xl font-medium">{m.t}</div>
              <p className="mt-1 text-muted-foreground">{m.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <div className="glass-strong rounded-3xl p-10 md:p-14">
          <Factory className="h-8 w-8 text-brand-cyan" />
          <h2 className="mt-6 text-3xl md:text-5xl font-medium leading-tight max-w-3xl">Our commitment to <span className="text-gradient">net-zero manufacturing</span> by 2040.</h2>
          <p className="mt-5 text-muted-foreground max-w-2xl">We publish an annual sustainability report audited by independent third parties, covering Scope 1, 2 and 3 emissions, water use, waste streams and social-impact metrics.</p>
        </div>
      </Section>
    </>
  );
}
