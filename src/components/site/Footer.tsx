import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5 bg-gradient-to-b from-transparent to-black/40">
      <div className="hairline" />
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-6">
          <Logo className="h-12" />
          <p className="text-sm text-muted-foreground max-w-sm">
            Kohinoor Polytech engineers sustainable polypropylene compounds and recycled granules for the world's most demanding manufacturers.
          </p>
          <form className="flex gap-2 max-w-sm">
            <input type="email" placeholder="Subscribe to insights" className="flex-1 rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm outline-none focus:border-brand-cyan/60" />
            <button className="btn-primary text-xs px-5 py-2">Subscribe</button>
          </form>
          <div className="flex gap-3">
            {[Linkedin, Twitter, Youtube, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 transition-colors">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-brand-cyan mb-4">Company</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/sustainability" className="hover:text-foreground">Sustainability</Link></li>
            <li><Link to="/projects" className="hover:text-foreground">Projects</Link></li>
            <li><Link to="/gallery" className="hover:text-foreground">Gallery</Link></li>
            <li><Link to="/blog" className="hover:text-foreground">Insights</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-brand-cyan mb-4">Products</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-foreground">PPHP Granules</Link></li>
            <li><Link to="/products" className="hover:text-foreground">PPCP Granules</Link></li>
            <li><Link to="/products" className="hover:text-foreground">Custom Compounds</Link></li>
            <li><Link to="/products" className="hover:text-foreground">Color Masterbatch</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-brand-cyan mb-4">Contact</div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> Kim Station Road, Mota Borasara, Surat, Gujarat 394110, India</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5" /> +91 90333 33258</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5" /> sales@kohinoorpolytech.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Kohinoor Polytech. Engineering the future of sustainable polymers.</div>
          <div className="flex gap-6">
            <a href="#">ISO 9001:2015</a>
            <a href="#">RoHS Compliant</a>
            <a href="#">REACH Registered</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
