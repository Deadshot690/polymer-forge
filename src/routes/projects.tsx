import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Kohinoor Polytech" },
      { name: "description", content: "Case studies from converters who switched to Kohinoor polymer solutions." },
      { property: "og:title", content: "Projects & Case Studies — Kohinoor Polytech" },
      { property: "og:description", content: "Real-world impact across automotive, packaging and paint sectors." },
    ],
  }),
  component: Projects,
});

const cases = [
  { t: "Automotive Tier-1: 8% faster cycle times", p: "MFI drift causing 12% scrap rate on injection-moulded trims.", s: "Switched to Kohinoor PPCP with tighter MFI tolerance ±0.4.", r: "Cycle time down 8%, scrap rate down to 1.8%." },
  { t: "Paint major: zero re-calibration on colour", p: "Lot-to-lot colour shift causing recurring line stops.", s: "Custom red PPCP with spectrophotometer-validated ΔE < 0.6.", r: "Zero recalibration over 24 months of production." },
  { t: "Packaging OEM: 70% recycled content", p: "Brand sustainability mandate for ≥50% PCR in new packaging line.", s: "Co-engineered 70% PCR PPHP with virgin-equivalent properties.", r: "Brand achieved sustainability KPI 12 months ahead of plan." },
  { t: "Household goods: 22% cost reduction", p: "Polymer cost inflation eroding margins on consumer products.", s: "Migrated to engineered PPHP grades with optimised formulation.", r: "22% material cost reduction with no consumer-facing changes." },
];

function Projects() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title={<>Case studies from <span className="text-gradient">real production lines</span>.</>}
        sub="How converters and OEMs use Kohinoor polymers to ship better products."
      />
      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((c) => (
            <div key={c.t} className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-medium">{c.t}</h3>
              <div className="mt-6 grid gap-4">
                <div><div className="text-xs uppercase tracking-widest text-brand-cyan">Problem</div><p className="mt-1 text-sm text-muted-foreground">{c.p}</p></div>
                <div><div className="text-xs uppercase tracking-widest text-brand-cyan">Solution</div><p className="mt-1 text-sm text-muted-foreground">{c.s}</p></div>
                <div><div className="text-xs uppercase tracking-widest text-brand-green">Result</div><p className="mt-1 text-sm text-foreground/90">{c.r}</p></div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
