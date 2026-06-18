import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { productCategories, industries } from "@/data/products";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products", mega: "products" as const },
  { to: "/industries", label: "Industries", mega: "industries" as const },
  { to: "/sustainability", label: "Sustainability" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Insights" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<null | "products" | "industries">(null);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); setMega(null); }, [path]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className={`mx-auto max-w-7xl px-4 transition-all duration-500`}>
        <div className={`flex items-center justify-between rounded-full border px-4 md:px-6 py-2.5 ${scrolled ? "glass-strong" : "border-white/5 bg-white/[0.02] backdrop-blur-md"}`}>
          <Link to="/" className="flex items-center gap-2 group">
            <Logo className="h-8" />
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = path === item.to || (item.to !== "/" && path.startsWith(item.to));
              return (
                <div
                  key={item.to}
                  className="relative"
                  onMouseEnter={() => item.mega && setMega(item.mega)}
                  onMouseLeave={() => item.mega && setMega(null)}
                >
                  <Link
                    to={item.to}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {item.label}
                    {item.mega && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
                    {active && (
                      <motion.span layoutId="nav-underline" className="absolute -bottom-1 left-3 right-3 h-px bg-gradient-to-r from-brand-cyan via-brand-blue-2 to-brand-green" />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>
          <div className="hidden lg:flex items-center gap-2">
            <Link to="/contact" className="btn-primary text-xs px-5 py-2">Request Quote</Link>
          </div>
          <button className="lg:hidden p-2 text-foreground" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {mega && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              onMouseEnter={() => setMega(mega)}
              onMouseLeave={() => setMega(null)}
              className="absolute left-1/2 top-full mt-3 w-[min(900px,90vw)] -translate-x-1/2 rounded-2xl glass-strong p-6"
            >
              {mega === "products" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {productCategories.map((c) => (
                    <Link key={c.key} to="/products" className="group rounded-xl p-4 hover:bg-white/5 transition-colors">
                      <div className="text-xs uppercase tracking-widest text-brand-cyan">{c.key}</div>
                      <div className="mt-1 font-medium">{c.title}</div>
                      <p className="mt-1 text-xs text-muted-foreground">{c.description}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {industries.map((i) => (
                    <Link key={i.slug} to="/industries/$slug" params={{ slug: i.slug }} className="rounded-xl p-4 hover:bg-white/5 transition-colors">
                      <div className="font-medium">{i.name}</div>
                      <p className="mt-1 text-xs text-muted-foreground">{i.blurb}</p>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 rounded-2xl glass-strong p-4"
            >
              <div className="flex flex-col">
                {navItems.map((i) => (
                  <Link key={i.to} to={i.to} className="px-3 py-2.5 rounded-lg text-sm hover:bg-white/5">
                    {i.label}
                  </Link>
                ))}
                <Link to="/contact" className="btn-primary mt-3">Request Quote</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll progress */}
        <motion.div style={{ scaleX: progress }} className="origin-left fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-brand-cyan via-brand-blue-2 to-brand-green z-50" />
      </div>
    </motion.header>
  );
}
