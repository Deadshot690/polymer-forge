import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section, PageHero } from "@/components/site/Section";
import { products } from "@/data/products";
import { ArrowLeft, Download, Mail, ChevronRight } from "lucide-react";
import { lazy, Suspense } from "react";
import { openLeadDialog } from "@/lib/leads";
const GranuleSphere = lazy(() => import("@/components/three/GranuleSphere"));

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Product"} — Kohinoor Polytech` },
      { name: "description", content: loaderData?.product.description ?? "" },
      { property: "og:title", content: `${loaderData?.product.name} — Kohinoor Polytech` },
      { property: "og:description", content: loaderData?.product.description ?? "" },
    ],
  }),
  component: ProductDetail,
  notFoundComponent: () => <div className="pt-40 text-center">Product not found.</div>,
  errorComponent: () => <div className="pt-40 text-center">Something went wrong.</div>,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const related = products.filter(p => p.category === product.category && p.slug !== product.slug).slice(0, 3);
  return (
    <>
      <section className="relative pt-40 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="mx-auto max-w-7xl px-6 relative">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to catalogue</Link>
          <div className="grid lg:grid-cols-2 gap-12 mt-10 items-center">
            <div className="aspect-square rounded-3xl glass overflow-hidden relative">
              <Suspense fallback={null}>
                <GranuleSphere color={product.swatch} />
              </Suspense>
            </div>
            <div>
              <div className="chip mb-4">{product.category}</div>
              <h1 className="text-5xl md:text-6xl font-medium leading-tight">{product.name}</h1>
              <p className="mt-6 text-lg text-muted-foreground">{product.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => openLeadDialog({ productName: product.name, grade: product.category, source: `product:${product.slug}` })}
                >
                  Request Quote
                </button>
                <button className="btn-ghost"><Download className="h-4 w-4" /> Technical datasheet</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="glass rounded-2xl p-6">
            <div className="text-xs uppercase tracking-widest text-brand-cyan">Application</div>
            <div className="mt-2 text-lg">{product.application}</div>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="text-xs uppercase tracking-widest text-brand-cyan">Colour</div>
            <div className="mt-2 text-lg flex items-center gap-3"><span className="h-5 w-5 rounded-full ring-2 ring-white/20" style={{ background: product.swatch }} /> {product.color}</div>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="text-xs uppercase tracking-widest text-brand-cyan">Form</div>
            <div className="mt-2 text-lg">Cylindrical granules · 3 mm</div>
          </div>
        </div>

        <div className="mt-10 glass rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 text-sm uppercase tracking-widest text-brand-cyan">Technical specifications</div>
          <table className="w-full text-sm">
            <tbody>
              {[
                ["Melt Flow Index (230 °C, 2.16 kg)", product.mfi],
                ["Density", product.density],
                ["Tensile strength at yield", "32 MPa"],
                ["Flexural modulus", "1,450 MPa"],
                ["Notched Izod impact (23 °C)", "5.5 kJ/m²"],
                ["Heat deflection (0.45 MPa)", "95 °C"],
                ["Moisture content", "< 0.1%"],
                ["Packaging", "25 kg PE bags / 1 MT jumbo bags"],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-white/5 last:border-0">
                  <td className="px-6 py-3 text-muted-foreground">{k}</td>
                  <td className="px-6 py-3 font-num">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 glass-strong rounded-2xl p-8 grid md:grid-cols-[1.4fr,1fr] gap-6 items-center">
          <div>
            <div className="chip mb-3">Inquiry</div>
            <h3 className="text-2xl md:text-3xl font-medium">Need a sample of {product.name}?</h3>
            <p className="mt-2 text-muted-foreground">Our application engineers respond within one business day.</p>
          </div>
          <div className="grid gap-3">
            <button
              type="button"
              className="btn-primary"
              onClick={() => openLeadDialog({ productName: product.name, grade: product.category, source: `product-inquiry:${product.slug}` })}
            >
              <Mail className="h-4 w-4" /> Send Inquiry for {product.name}
            </button>
            <p className="text-xs text-muted-foreground">Quote includes MFI, density and packaging options. Typical reply within one business day.</p>
          </div>
        </div>

        <div className="mt-14">
          <div className="text-xs uppercase tracking-widest text-brand-cyan mb-5">Related grades</div>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="glass rounded-2xl p-6 group">
                <div className="flex items-center justify-between"><span className="chip">{p.category}</span><span className="h-6 w-6 rounded-full ring-2 ring-white/20" style={{ background: p.swatch }} /></div>
                <div className="mt-4 font-medium text-lg">{p.name}</div>
                <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1 group-hover:text-brand-cyan">View <ChevronRight className="h-3 w-3" /></div>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
