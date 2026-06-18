import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageHero, Section } from "@/components/site/Section";
import { products, productCategories } from "@/data/products";
import { ChevronRight, Search } from "lucide-react";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — Kohinoor Polytech" },
      { name: "description", content: "Browse our full catalogue of PPHP, PPCP, custom compounds and colour masterbatch grades." },
      { property: "og:title", content: "Kohinoor Polytech Product Catalogue" },
      { property: "og:description", content: "Premium polypropylene granules for industrial manufacturing." },
    ],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  const [filter, setFilter] = useState<"All" | "PPHP" | "PPCP">("All");
  const [q, setQ] = useState("");
  const filtered = products.filter(p =>
    (filter === "All" || p.category === filter) &&
    (q === "" || p.name.toLowerCase().includes(q.toLowerCase()))
  );
  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title={<>Premium polymer <span className="text-gradient">product range</span>.</>}
        sub="Engineered PPHP and PPCP granules in a comprehensive colour and grade palette."
      />
      <Section>
        <div className="mb-10 grid lg:grid-cols-5 gap-6">
          {productCategories.map((c) => (
            <div key={c.key} className="glass rounded-2xl p-5">
              <div className="text-xs uppercase tracking-widest text-brand-cyan">{c.key}</div>
              <div className="mt-1 font-medium">{c.title}</div>
              <p className="mt-2 text-xs text-muted-foreground">{c.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex gap-2">
            {(["All","PPHP","PPCP"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm transition-colors ${filter===f ? "bg-white/10 text-foreground border border-white/20" : "text-muted-foreground hover:text-foreground border border-white/5"}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search grades…" className="w-full rounded-full bg-white/5 border border-white/10 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-cyan/50" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="glass rounded-2xl p-6 group relative overflow-hidden">
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" style={{ background: p.swatch }} />
              <div className="flex items-center justify-between relative">
                <span className="chip">{p.category}</span>
                <div className="h-7 w-7 rounded-full ring-2 ring-white/20" style={{ background: p.swatch }} />
              </div>
              <div className="mt-6 font-medium text-xl">{p.name}</div>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground border-t border-white/5 pt-4">
                <span className="font-num">MFI {p.mfi}</span>
                <span className="flex items-center gap-1 group-hover:text-brand-cyan">View <ChevronRight className="h-3 w-3" /></span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
