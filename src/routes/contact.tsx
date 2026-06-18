import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { saveLead } from "@/lib/leads";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Kohinoor Polytech" },
      { name: "description", content: "Talk to our sales and application engineering team. Quotes within one business day." },
      { property: "og:title", content: "Contact Kohinoor Polytech" },
      { property: "og:description", content: "Quotes, samples and consultations." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", topic: "Sales inquiry", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const PHONE = "+91 90333 33258";
  const PHONE_DIGITS = "919033333258";
  const EMAIL = "sales@kohinoorpolytech.com";
  const ADDRESS = "Kim Station Road, Mota Borasara, Kim 394110, Surat, Gujarat, India";
  const WHATSAPP = `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent("Hello Kohinoor Polytech, I would like to enquire about your polymer products.")}`;
  const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
  const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;
  const MAILTO = `mailto:${EMAIL}`;
  const TEL = `tel:${PHONE_DIGITS}`;

  const schema = z.object({
    name: z.string().trim().min(1, "Name required").max(100),
    email: z.string().trim().email("Valid email required").max(255),
    message: z.string().trim().min(1, "Message required").max(1000),
  });

  function makeWhatsAppUrl() {
    const messageLines = [
      "Hello Kohinoor Polytech, I would like to enquire about your polymer products.",
      "",
      `Name: ${form.name}`,
      `Company: ${form.company || "N/A"}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "N/A"}`,
      `Topic: ${form.topic}`,
      "",
      "Message:",
      form.message,
    ];
    const encoded = encodeURIComponent(messageLines.join("\n"));
    return `https://wa.me/${PHONE_DIGITS}?text=${encoded}`;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse({ name: form.name, email: form.email, message: form.message });
    if (!result.success) {
      const fe: Record<string, string> = {};
      for (const i of result.error.issues) fe[i.path[0] as string] = i.message;
      setErrors(fe);
      return;
    }
    saveLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      message: `[${form.topic}] ${form.message}`,
      source: "contact-page",
    });
    setErrors({});

    const whatsappUrl = makeWhatsAppUrl();
    window.open(whatsappUrl, "_blank");
    setForm({ name: "", company: "", email: "", phone: "", topic: "Sales inquiry", message: "" });
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let's build <span className="text-gradient">together</span>.</>}
        sub="Talk to an application engineer about grade selection, samples or large-volume contracts."
      />
      <Section>
        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-10">
          <form onSubmit={onSubmit} className="glass rounded-3xl p-8 grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input value={form.name} onChange={set("name")} placeholder="Full name" className="w-full rounded-full bg-white/5 border border-white/10 px-5 py-3 text-sm outline-none focus:border-brand-cyan/50" />
                {errors.name && <span className="text-xs text-red-400 px-3 mt-1 block">{errors.name}</span>}
              </div>
              <input value={form.company} onChange={set("company")} placeholder="Company" className="rounded-full bg-white/5 border border-white/10 px-5 py-3 text-sm outline-none focus:border-brand-cyan/50" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input value={form.email} onChange={set("email")} type="email" placeholder="Work email" className="w-full rounded-full bg-white/5 border border-white/10 px-5 py-3 text-sm outline-none focus:border-brand-cyan/50" />
                {errors.email && <span className="text-xs text-red-400 px-3 mt-1 block">{errors.email}</span>}
              </div>
              <input value={form.phone} onChange={set("phone")} placeholder="Phone" className="rounded-full bg-white/5 border border-white/10 px-5 py-3 text-sm outline-none focus:border-brand-cyan/50" />
            </div>
            <select value={form.topic} onChange={set("topic")} className="rounded-full bg-white/5 border border-white/10 px-5 py-3 text-sm outline-none focus:border-brand-cyan/50">
              <option>Sales inquiry</option><option>Sample request</option><option>Custom compounding</option><option>Sustainability partnership</option>
            </select>
            <div>
              <textarea value={form.message} onChange={set("message")} rows={5} placeholder="Tell us about your application…" className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-3 text-sm outline-none focus:border-brand-cyan/50" />
              {errors.message && <span className="text-xs text-red-400 px-3 mt-1 block">{errors.message}</span>}
            </div>
            <button type="submit" className="btn-primary justify-self-start"><Send className="h-4 w-4" /> Send Message</button>
          </form>

          <div className="space-y-5">
            <div className="glass rounded-2xl p-6">
              <MapPin className="h-6 w-6 text-brand-cyan" />
              <div className="mt-3 font-medium">Head office & plant</div>
              <p className="mt-2 text-sm text-muted-foreground">{ADDRESS}</p>
              <a href={MAP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-brand-blue mt-3 underline">View on Google Maps</a>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <a href={TEL} className="glass rounded-2xl p-6 block hover:bg-white/10 transition">
                <Phone className="h-6 w-6 text-brand-cyan" />
                <div className="mt-3 text-sm font-medium">Sales</div>
                <div className="text-xs text-muted-foreground font-num mt-1">{PHONE}</div>
              </a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="glass rounded-2xl p-6 block hover:bg-white/10 transition">
                <MessageCircle className="h-6 w-6 text-brand-green" />
                <div className="mt-3 text-sm font-medium">WhatsApp</div>
                <div className="text-xs text-muted-foreground font-num mt-1">{PHONE}</div>
              </a>
              <a href={MAILTO} className="glass rounded-2xl p-6 block hover:bg-white/10 transition">
                <Mail className="h-6 w-6 text-brand-cyan" />
                <div className="mt-3 text-sm font-medium">Email</div>
                <div className="text-xs text-muted-foreground mt-1">{EMAIL}</div>
              </a>
              <div className="glass rounded-2xl p-6">
                <Clock className="h-6 w-6 text-brand-cyan" />
                <div className="mt-3 text-sm font-medium">Hours</div>
                <div className="text-xs text-muted-foreground mt-1">Mon–Sat · 9:30–18:30 IST</div>
              </div>
            </div>
            <div className="glass rounded-2xl overflow-hidden">
              <iframe
                title="Kohinoor Polytech location"
                src={MAP_EMBED}
                className="w-full h-96 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
