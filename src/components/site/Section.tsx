import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, sub }: { eyebrow?: string; title: ReactNode; sub?: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-3xl mb-14"
    >
      {eyebrow && <div className="chip mb-5">{eyebrow}</div>}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight">{title}</h2>
      {sub && <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">{sub}</p>}
    </motion.div>
  );
}

export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass rounded-2xl p-6 ${className}`}>{children}</div>;
}

export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: ReactNode }) {
  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-brand-blue-2/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-40 -left-20 h-[380px] w-[380px] rounded-full bg-brand-green/15 blur-[120px] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 relative">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="chip mb-6">{eyebrow}</div>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-[0.98] max-w-4xl">{title}</h1>
          {sub && <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{sub}</p>}
        </motion.div>
      </div>
    </section>
  );
}
