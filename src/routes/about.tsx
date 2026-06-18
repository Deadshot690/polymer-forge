import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Section, SectionHeader, PageHero } from "@/components/site/Section";
import { ShieldCheck, Target, Eye, Compass, Award, Cpu, Layers, Leaf } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Kohinoor Polytech" },
      { name: "description", content: "Kohinoor Polytech is a sustainable polymer engineering company manufacturing premium PPHP, PPCP and custom compounds." },
      { property: "og:title", content: "About Kohinoor Polytech" },
      { property: "og:description", content: "Sustainable polymer engineering, built around a circular economy." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Kohinoor"
        title={<>A <span className="text-gradient">sustainable polymer</span> engineering company.</>}
        sub="We convert recycled polypropylene into premium industrial-grade granules used by global converters and OEMs."
      />
      <Section>
        <div className="grid lg:grid-cols-3 gap-6">
          {[
            { i: Target, t: "Mission", d: "Deliver high-performance, cost-efficient polypropylene compounds while raising the bar for environmental responsibility in plastics." },
            { i: Eye, t: "Vision", d: "To be a leading force in sustainable polymer solutions, driving the industry toward a cleaner, circular economy." },
            { i: Compass, t: "Values", d: "Integrity, scientific rigour, customer obsession and an uncompromising commitment to sustainability." },
          ].map((b) => (
            <div key={b.t} className="glass rounded-2xl p-8">
              <b.i className="h-8 w-8 text-brand-cyan" />
              <div className="mt-5 text-xl font-medium">{b.t}</div>
              <p className="mt-3 text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <SectionHeader eyebrow="Our story" title="From a Surat workshop to a national polymer manufacturer." />
        <div className="grid md:grid-cols-2 gap-12">
          <p className="text-muted-foreground text-lg leading-relaxed">
            Kohinoor Polytech was founded with a single conviction: that India's plastic waste problem is also its biggest manufacturing opportunity. Over more than a decade, we've scaled from a single extruder to a multi-line facility serving automotive, packaging, paint and household sectors across the country.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Today, every kilogram of polymer we ship begins life as discarded plastic — sorted, washed, re-engineered and quality-controlled until it meets the same specifications as virgin material. Our customers see no compromise, and the planet sees one less landfill load.
          </p>
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <SectionHeader eyebrow="Timeline" title="Milestones." />
        <div className="relative pl-6 border-l border-white/10 space-y-10">
          {[
            { y: "2013", t: "Company founded", d: "Set up first compounding line in Surat, Gujarat." },
            { y: "2016", t: "PPCP production scaled", d: "Introduced impact copolymer grades for paint and packaging." },
            { y: "2019", t: "Lab established", d: "In-house polymer testing lab certified for MFI, density and impact." },
            { y: "2022", t: "Capacity doubled", d: "Commissioned twin-screw extrusion lines to 20,000 T/year capacity." },
            { y: "2025", t: "Circular-economy programme", d: "Launched closed-loop water reuse and renewable-energy roadmap." },
          ].map((m) => (
            <motion.div key={m.y} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-brand-cyan ring-4 ring-brand-cyan/20" />
              <div className="font-num text-brand-cyan tracking-widest text-sm">{m.y}</div>
              <div className="mt-1 text-xl font-medium">{m.t}</div>
              <p className="mt-1 text-muted-foreground">{m.d}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <SectionHeader eyebrow="Infrastructure" title="Built for industrial-grade output." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { i: Cpu, t: "Twin-screw extrusion", d: "Four lines with in-line MFI monitoring." },
            { i: Layers, t: "Sorting & washing", d: "Optical sorting and multi-stage wash trains." },
            { i: ShieldCheck, t: "Quality lab", d: "Mechanical, thermal and rheological testing." },
            { i: Leaf, t: "Closed-loop water", d: "85% water reuse across processing." },
          ].map((b) => (
            <div key={b.t} className="glass rounded-2xl p-6">
              <b.i className="h-7 w-7 text-brand-cyan" />
              <div className="mt-4 font-medium">{b.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <SectionHeader eyebrow="Certifications" title="Audited and globally compliant." />
        <div className="flex flex-wrap gap-3">
          {["ISO 9001:2015","ISO 14001:2015","REACH","RoHS","EPR Registered","BIS Certified"].map((c) => (
            <div key={c} className="glass rounded-full px-5 py-2.5 text-sm flex items-center gap-2"><Award className="h-4 w-4 text-brand-cyan" /> {c}</div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <SectionHeader eyebrow="Leadership" title="The team behind Kohinoor." />
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { n: "Founder & CEO", r: "Strategy & operations" },
            { n: "Head of Engineering", r: "Compounding & process design" },
            { n: "Head of Sustainability", r: "ESG & circular programmes" },
          ].map((p) => (
            <div key={p.n} className="glass rounded-2xl p-6">
              <div className="h-32 rounded-xl bg-gradient-to-br from-brand-blue/30 via-brand-blue-2/20 to-brand-green/20 mb-5" />
              <div className="font-medium text-lg">{p.n}</div>
              <div className="text-sm text-muted-foreground">{p.r}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
