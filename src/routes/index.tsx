import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, lazy, Suspense } from "react";
import { ArrowRight, Sparkles, ShieldCheck, Layers, Palette, Truck, Recycle, Cpu, Factory, Leaf, Quote, ChevronRight } from "lucide-react";
import { Section, SectionHeader, GlassCard } from "@/components/site/Section";
import { products, productCategories, industries } from "@/data/products";
import { transformationPhase } from "@/lib/transformation-phase";
import { openLeadDialog } from "@/lib/leads";

const ParticleField = lazy(() => import("@/components/three/ParticleField"));
const GranuleSphere = lazy(() => import("@/components/three/GranuleSphere"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kohinoor Polytech — Engineering the Future of Sustainable Polymers" },
      { name: "description", content: "Premium PPHP, PPCP and custom polypropylene compounds engineered from recycled polymers for global industrial manufacturing." },
      { property: "og:title", content: "Kohinoor Polytech — Sustainable Polymer Engineering" },
      { property: "og:description", content: "Transforming recycled materials into high-performance industrial compounds." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <TransformationStage />
      <WhoWeAre />
      <WhyChoose />
      <ProductShowcase />
      <Industries />
      <Manufacturing />
      <Sustainability />
      <Testimonials />
      <CTA />
    </>
  );
}

// Hero + CircularStory share one scroll progress range that drives the
// global `transformationPhase` motion value. The 3D ParticleField in the
// hero reads it each frame and morphs through waste -> recycling -> product.
function TransformationStage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    transformationPhase.set(Math.max(0, Math.min(1, v)));
  });
  return (
    <div ref={ref}>
      <Hero />
      <CircularStory />
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </motion.div>
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 pt-40 md:pt-48 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="chip mb-6"><Sparkles className="h-3 w-3 text-brand-cyan" /> Sustainable Polymer Engineering</div>
          <h1 className="text-[10vw] md:text-[6.5vw] lg:text-[5.2rem] xl:text-[6rem] font-medium leading-[0.95] tracking-tight">
            Engineering the future of <span className="text-gradient">sustainable polymers</span>.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl">
            Transforming recycled materials into high-performance industrial compounds for modern manufacturing — at scale, with uncompromised purity.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/products" className="btn-primary">Explore Products <ArrowRight className="h-4 w-4" /></Link>
            <button type="button" onClick={() => openLeadDialog({ source: "hero" })} className="btn-ghost">Request a Quote</button>
            <button type="button" onClick={() => openLeadDialog({ source: "hero-consultation" })} className="btn-ghost">Book Consultation</button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { k: "12+", l: "Years of expertise" },
            { k: "20k T", l: "Annual capacity" },
            { k: "60+", l: "Polymer grades" },
            { k: "7", l: "Industries served" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl p-5">
              <div className="font-num text-3xl md:text-4xl font-semibold text-gradient">{s.k}</div>
              <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground/70 flex flex-col items-center gap-2">
        <span>Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-muted-foreground/40 to-transparent" />
      </div>
    </section>
  );
}

function WhoWeAre() {
  return (
    <Section>
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="chip mb-5">Who we are</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
            A polymer engineering company built around the <span className="text-gradient">circular economy</span>.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg">
            Kohinoor Polytech converts post-consumer and post-industrial polypropylene into premium PPHP, PPCP and custom-engineered compounds. Every batch is validated for MFI stability, impurity control and colour consistency before it leaves our plant.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
            {[["Homopolymer","PPHP"],["Copolymer","PPCP"],["Compounds","Custom"],["Masterbatch","Colour"]].map(([a,b]) => (
              <div key={a} className="glass rounded-xl p-4">
                <div className="text-xs uppercase tracking-widest text-brand-cyan">{b}</div>
                <div className="mt-1 font-medium">{a}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-square rounded-3xl glass overflow-hidden">
          <Suspense fallback={null}>
            <GranuleSphere color="#2563EB" />
          </Suspense>
          <div className="absolute bottom-5 left-5 right-5 glass-strong rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-brand-cyan">Polymer molecule</div>
              <div className="font-medium">Polypropylene · C₃H₆</div>
            </div>
            <div className="font-num text-sm text-muted-foreground">Live · 3D</div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function CircularStory() {
  const steps = [
    { i: "01", t: "Plastic Waste", d: "Post-consumer & post-industrial PP streams sourced through certified channels.", icon: Recycle },
    { i: "02", t: "Collection & Sorting", d: "Automated optical sorting separates polymers by grade and colour.", icon: Layers },
    { i: "03", t: "Cleaning & Processing", d: "Multi-stage washing removes contaminants below industry thresholds.", icon: ShieldCheck },
    { i: "04", t: "Granule Production", d: "Twin-screw extrusion yields uniform pellets with controlled MFI.", icon: Cpu },
    { i: "05", t: "Manufacturing", d: "Granules ship to OEMs and converters across seven industries.", icon: Factory },
    { i: "06", t: "Consumer Products", d: "Recycled-content products re-enter the loop, closing the cycle.", icon: Leaf },
  ];
  return (
    <Section id="circular-economy" className="border-y border-white/5 bg-gradient-to-b from-transparent via-deep/40 to-transparent">
      <SectionHeader
        eyebrow="The circular economy"
        title={<>From waste stream to <span className="text-gradient">premium granule</span>.</>}
        sub="Our closed-loop process turns discarded polypropylene into industrial-grade material — verified at every stage."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {steps.map((s, idx) => (
          <motion.div
            key={s.i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.06 }}
            className="glass rounded-2xl p-6 relative overflow-hidden group"
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-blue-2/20 blur-2xl group-hover:bg-brand-green/30 transition-colors" />
            <div className="font-num text-xs text-brand-cyan tracking-widest">STEP {s.i}</div>
            <s.icon className="h-7 w-7 mt-4 text-brand-cyan" />
            <div className="mt-4 font-medium text-lg">{s.t}</div>
            <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function WhyChoose() {
  const reasons = [
    { i: ShieldCheck, t: "High purity materials", d: "Multi-stage purification keeps contaminants below industry threshold." },
    { i: Cpu, t: "Consistent MFI", d: "Tight melt-flow tolerance batch-to-batch for predictable processing." },
    { i: Layers, t: "Quality assurance", d: "In-house lab testing across mechanical, thermal and rheological properties." },
    { i: Palette, t: "Custom colour development", d: "Shade-matching with pigment masterbatches and colour spectro analysis." },
    { i: Truck, t: "Reliable supply chain", d: "Pan-India logistics and export-ready containerised shipping." },
    { i: Leaf, t: "Sustainable manufacturing", d: "Closed-loop water and energy systems across our facility." },
    { i: Recycle, t: "Recycled content", d: "Up to 100% PCR options compliant with EPR mandates." },
    { i: Sparkles, t: "Dedicated technical support", d: "Application engineers embedded with your processing team." },
  ];
  return (
    <Section>
      <SectionHeader eyebrow="Why Kohinoor" title={<>Eight reasons converters choose us.</>} />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reasons.map((r) => (
          <motion.div
            key={r.t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="glass rounded-2xl p-6 group hover:border-white/20 transition-colors"
          >
            <r.i className="h-7 w-7 text-brand-cyan group-hover:text-brand-green transition-colors" />
            <div className="mt-4 font-medium">{r.t}</div>
            <p className="mt-2 text-sm text-muted-foreground">{r.d}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function ProductShowcase() {
  const featured = products.slice(0, 6);
  return (
    <Section className="border-t border-white/5">
      <SectionHeader
        eyebrow="Product categories"
        title={<>Engineered <span className="text-gradient">polymer ranges</span> for every application.</>}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {featured.map((p) => (
          <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="glass rounded-2xl p-6 group relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" style={{ background: p.swatch }} />
            <div className="flex items-center justify-between relative">
              <span className="chip">{p.category}</span>
              <div className="h-6 w-6 rounded-full ring-2 ring-white/20" style={{ background: p.swatch }} />
            </div>
            <div className="mt-6 font-medium text-xl">{p.name}</div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
            <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground border-t border-white/5 pt-4">
              <span className="font-num">MFI {p.mfi}</span>
              <span className="flex items-center gap-1 group-hover:text-brand-cyan">View <ChevronRight className="h-3 w-3" /></span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link to="/products" className="btn-ghost">View the full catalogue <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </Section>
  );
}

function Industries() {
  return (
    <Section>
      <SectionHeader eyebrow="Industries served" title={<>Trusted across <span className="text-gradient">seven verticals</span>.</>} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {industries.map((i) => (
          <Link key={i.slug} to="/industries/$slug" params={{ slug: i.slug }} className="glass rounded-2xl p-6 group hover:border-white/20 transition-all hover:-translate-y-1">
            <div className="text-xs uppercase tracking-widest text-brand-cyan">Industry</div>
            <div className="mt-2 text-xl font-medium">{i.name}</div>
            <p className="mt-3 text-sm text-muted-foreground">{i.blurb}</p>
            <div className="mt-6 inline-flex items-center text-sm text-foreground/80 group-hover:text-brand-cyan">
              Explore <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

function Manufacturing() {
  const stats = [
    { k: "12+", l: "Years operating" },
    { k: "20,000 T", l: "Annual production capacity" },
    { k: "60+", l: "Product variants" },
    { k: "7", l: "Industries served" },
    { k: "250+", l: "Active clients" },
  ];
  return (
    <Section className="border-y border-white/5">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="chip mb-5">Manufacturing excellence</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
            A factory engineered for <span className="text-gradient">precision and scale</span>.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg">
            Twin-screw extrusion lines, in-line MFI monitoring and a fully equipped polymer lab — operating around the clock with stringent QC checkpoints.
          </p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.l} className="glass rounded-xl p-4">
                <div className="font-num text-2xl md:text-3xl font-semibold text-gradient">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/5] rounded-3xl glass overflow-hidden">
          <Suspense fallback={null}>
            <GranuleSphere color="#22C55E" />
          </Suspense>
          <div className="absolute inset-x-5 bottom-5 glass-strong rounded-xl p-4">
            <div className="text-xs uppercase tracking-widest text-brand-cyan">Production line</div>
            <div className="mt-1 text-sm">Twin-screw extrusion · 4 lines · 24/7</div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Sustainability() {
  const stats = [
    { k: "14,000+ T", l: "Plastic waste recycled" },
    { k: "32,000 T", l: "CO₂ emissions avoided" },
    { k: "85%", l: "Closed-loop water reuse" },
    { k: "100%", l: "Renewable energy roadmap" },
  ];
  return (
    <Section>
      <SectionHeader
        eyebrow="Sustainability impact"
        title={<>Measurable progress toward a <span className="text-gradient">circular polymer economy</span>.</>}
        sub="We publish our environmental impact metrics annually, audited by independent third parties."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => (
          <div key={s.l} className="glass rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-brand-green/20 blur-2xl" />
            <div className="font-num text-3xl md:text-4xl font-semibold text-gradient">{s.k}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Testimonials() {
  const reviews = [
    { q: "Kohinoor's PPCP grades held tighter MFI than any supplier we benchmarked. Our injection cycles dropped by 8%.", a: "Plant Head, Automotive Tier-1" },
    { q: "Their colour consistency batch-to-batch is exceptional. Our paint-bucket line runs without re-calibration.", a: "Operations Director, Coatings Major" },
    { q: "From sample request to bulk shipment in four weeks. The technical support team is genuinely engineering-grade.", a: "Procurement Lead, Packaging OEM" },
  ];
  return (
    <Section className="border-t border-white/5">
      <SectionHeader eyebrow="Client voices" title={<>What our converters say.</>} />
      <div className="grid md:grid-cols-3 gap-5">
        {reviews.map((r, i) => (
          <div key={i} className="glass rounded-2xl p-7">
            <Quote className="h-7 w-7 text-brand-cyan/70" />
            <p className="mt-5 text-foreground/90 leading-relaxed">{r.q}</p>
            <div className="mt-6 pt-4 border-t border-white/5 text-xs uppercase tracking-widest text-muted-foreground">{r.a}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function CTA() {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-3xl glass-strong p-10 md:p-16">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-brand-blue-2/40 blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-brand-green/30 blur-[100px]" />
        <div className="relative grid md:grid-cols-[1.4fr,1fr] gap-10 items-center">
          <div>
            <div className="chip mb-5">Let's build</div>
            <h2 className="text-4xl md:text-6xl font-medium leading-tight">
              Let's build <span className="text-gradient">sustainable manufacturing</span> together.
            </h2>
            <p className="mt-5 text-muted-foreground max-w-xl text-lg">
              Talk to an application engineer about grade selection, custom compounding or large-volume supply contracts.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <button type="button" onClick={() => openLeadDialog({ source: "home-cta" })} className="btn-primary">Get a Quote <ArrowRight className="h-4 w-4" /></button>
            <Link to="/contact" className="btn-ghost">Contact Sales</Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
