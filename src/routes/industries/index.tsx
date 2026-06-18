import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { industries } from "@/data/products";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industries — Kohinoor Polytech" },
      { name: "description", content: "Polymer solutions for automotive, packaging, paint, household, textile and industrial sectors." },
      { property: "og:title", content: "Industries — Kohinoor Polytech" },
      { property: "og:description", content: "Trusted by manufacturers across seven verticals." },
    ],
  }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={<>Polymer solutions across <span className="text-gradient">seven verticals</span>.</>}
        sub="Application-engineered grades for the most demanding production environments."
      />
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((i) => (
            <Link key={i.slug} to="/industries/$slug" params={{ slug: i.slug }} className="glass rounded-2xl p-7 group hover:-translate-y-1 transition-all">
              <div className="text-xs uppercase tracking-widest text-brand-cyan">Industry</div>
              <div className="mt-2 text-2xl font-medium">{i.name}</div>
              <p className="mt-3 text-sm text-muted-foreground">{i.blurb}</p>
              <div className="mt-6 inline-flex items-center gap-1 text-sm group-hover:text-brand-cyan">View <ChevronRight className="h-3 w-3" /></div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
