import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights — Kohinoor Polytech" },
      { name: "description", content: "Polymer engineering, recycling and manufacturing insights from the Kohinoor team." },
      { property: "og:title", content: "Insights — Kohinoor Polytech" },
      { property: "og:description", content: "Articles on polymer technology, recycling and manufacturing trends." },
    ],
  }),
  component: Blog,
});

const posts = [
  { t: "Why MFI tolerance defines your production economics", c: "Polymer science", d: "5 min read", date: "Mar 2026" },
  { t: "The case for PCR content in automotive interiors", c: "Sustainability", d: "7 min read", date: "Feb 2026" },
  { t: "Inside a twin-screw extrusion line", c: "Manufacturing", d: "6 min read", date: "Feb 2026" },
  { t: "Designing for circularity: a converter's checklist", c: "Sustainability", d: "8 min read", date: "Jan 2026" },
  { t: "Colour-matching recycled polymers: a primer", c: "Polymer science", d: "5 min read", date: "Jan 2026" },
  { t: "EPR compliance in 2026: what manufacturers need to know", c: "Regulation", d: "9 min read", date: "Dec 2025" },
];

function Blog() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={<>Polymer engineering, <span className="text-gradient">unpacked</span>.</>}
        sub="Notes from our application engineers, sustainability team and lab."
      />
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((p) => (
            <article key={p.t} className="glass rounded-2xl p-6 group cursor-pointer hover:-translate-y-1 transition-all">
              <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-brand-blue/30 via-brand-blue-2/20 to-brand-green/20 mb-5" />
              <div className="text-xs uppercase tracking-widest text-brand-cyan">{p.c}</div>
              <h3 className="mt-3 text-lg font-medium leading-snug group-hover:text-gradient">{p.t}</h3>
              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground border-t border-white/5 pt-4">
                <span>{p.date}</span>
                <span>{p.d}</span>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
