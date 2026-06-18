import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Kohinoor Polytech" },
      { name: "description", content: "Inside our facility, products, machinery and team." },
      { property: "og:title", content: "Gallery — Kohinoor Polytech" },
      { property: "og:description", content: "Inside our facility, products and team." },
    ],
  }),
  component: Gallery,
});

const tiles = [
  { t: "Factory floor", c: "from-brand-blue/50 to-brand-blue-2/30", h: "h-72" },
  { t: "Granule close-up · Blue", c: "from-brand-cyan/40 to-brand-blue/30", h: "h-56" },
  { t: "Twin-screw extrusion line", c: "from-brand-green/40 to-brand-cyan/30", h: "h-80" },
  { t: "Quality lab", c: "from-brand-blue-2/40 to-brand-green/30", h: "h-60" },
  { t: "Sorting station", c: "from-brand-green/40 to-brand-blue/30", h: "h-72" },
  { t: "Packing line", c: "from-brand-blue/40 to-brand-cyan/30", h: "h-64" },
  { t: "Drone view · Plant", c: "from-brand-cyan/40 to-brand-blue-2/30", h: "h-80" },
  { t: "Team at work", c: "from-brand-blue-2/40 to-brand-green/30", h: "h-56" },
  { t: "Granule close-up · Green", c: "from-brand-green/50 to-brand-cyan/30", h: "h-72" },
];

function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={<>Inside <span className="text-gradient">Kohinoor</span>.</>}
        sub="Factory floor, machinery and the polymers that power industrial manufacturing."
      />
      <Section>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {tiles.map((t, i) => (
            <div key={i} className={`mb-5 break-inside-avoid rounded-2xl overflow-hidden glass`}>
              <div className={`relative ${t.h} bg-gradient-to-br ${t.c} grid-bg`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-sm font-medium">{t.t}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
