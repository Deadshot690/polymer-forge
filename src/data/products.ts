export type Product = {
  slug: string;
  name: string;
  category: "PPHP" | "PPCP" | "PCR" | "Masterbatch";
  color: string;
  swatch: string; // tailwind/css color
  application: string;
  mfi: string;
  density: string;
  description: string;
};

const c = (hex: string) => hex;

export const products: Product[] = [
  // PPHP
  { slug: "pp-black-r", name: "PP Black (R)", category: "PPHP", color: "Black", swatch: c("#0b0b0f"), application: "Injection moulding, industrial parts", mfi: "12 g/10min", density: "0.905 g/cm³", description: "Homopolymer black granules with consistent MFI and high impact strength for moulded industrial components." },
  { slug: "pp-black-j", name: "PP Black (J)", category: "PPHP", color: "Black", swatch: c("#111114"), application: "Extrusion, sheets, pipes", mfi: "8 g/10min", density: "0.905 g/cm³", description: "Jet-grade homopolymer engineered for stable extrusion and uniform colour dispersion." },
  { slug: "pp-blue-r", name: "PP Blue (R)", category: "PPHP", color: "Blue", swatch: c("#1d4ed8"), application: "Containers, household goods", mfi: "11 g/10min", density: "0.905 g/cm³", description: "Recycled-grade PP blue granules with reliable melt flow and superior surface finish." },
  { slug: "pp-blue-j", name: "PP Blue (J)", category: "PPHP", color: "Blue", swatch: c("#2563eb"), application: "Crates, automotive trim", mfi: "9 g/10min", density: "0.905 g/cm³", description: "Jet-grade blue homopolymer for high-flow injection moulding applications." },
  { slug: "pp-green-r", name: "PP Green (R)", category: "PPHP", color: "Green", swatch: c("#16a34a"), application: "Packaging, caps & closures", mfi: "12 g/10min", density: "0.905 g/cm³", description: "Premium green PP granules with consistent shade and high purity." },
  { slug: "pp-green-j", name: "PP Green (J)", category: "PPHP", color: "Green", swatch: c("#22c55e"), application: "Extrusion, industrial trays", mfi: "8 g/10min", density: "0.905 g/cm³", description: "Jet-grade green homopolymer for high-flow moulding and stable dimensional output." },
  { slug: "pp-yellow-r", name: "PP Yellow (R)", category: "PPHP", color: "Yellow", swatch: c("#eab308"), application: "Industrial containers, toys", mfi: "11 g/10min", density: "0.905 g/cm³", description: "Bright yellow recycled-grade PP, balanced for strength and colour brilliance." },
  { slug: "pp-yellow-j", name: "PP Yellow (J)", category: "PPHP", color: "Yellow", swatch: c("#facc15"), application: "Caps, household, moulded parts", mfi: "9 g/10min", density: "0.905 g/cm³", description: "Jet grade homopolymer in saturated yellow for premium injection moulding." },
  { slug: "pp-mix-j", name: "PP Mix (J)", category: "PPHP", color: "Mixed", swatch: c("#4b5563"), application: "General purpose moulding", mfi: "10 g/10min", density: "0.905 g/cm³", description: "Engineered mixed-color homopolymer for cost-efficient industrial parts." },
  { slug: "pp-red-r", name: "PP Red (R)", category: "PPHP", color: "Red", swatch: c("#dc2626"), application: "Crates, packaging", mfi: "11 g/10min", density: "0.905 g/cm³", description: "Recycled-grade red PP with stable shade across batches." },
  { slug: "pp-red-j", name: "PP Red (J)", category: "PPHP", color: "Red", swatch: c("#ef4444"), application: "Containers, industrial moulding", mfi: "9 g/10min", density: "0.905 g/cm³", description: "Jet grade red PP homopolymer for high impact moulded products." },
  // PPCP
  { slug: "pp-milky-101", name: "PP Milky 101", category: "PPCP", color: "Milky", swatch: c("#f3f4f6"), application: "Thin-wall packaging, containers", mfi: "14 g/10min", density: "0.902 g/cm³", description: "Copolymer milky grade with excellent transparency-to-strength balance." },
  { slug: "pp-milky-102", name: "PP Milky 102", category: "PPCP", color: "Milky", swatch: c("#e5e7eb"), application: "Caps, closures, packaging", mfi: "10 g/10min", density: "0.902 g/cm³", description: "Higher viscosity milky copolymer for structural packaging components." },
  { slug: "ppcp-white", name: "PP White", category: "PPCP", color: "White", swatch: c("#ffffff"), application: "Paint buckets, packaging", mfi: "8 g/10min", density: "0.902 g/cm³", description: "Premium white copolymer for high-impact paint pails and industrial packaging." },
  { slug: "ppcp-red", name: "PP Red", category: "PPCP", color: "Red", swatch: c("#b91c1c"), application: "Paint buckets, containers", mfi: "9 g/10min", density: "0.902 g/cm³", description: "Saturated red copolymer for impact-grade containers." },
  { slug: "ppcp-blue", name: "PP Blue", category: "PPCP", color: "Blue", swatch: c("#1e3a8a"), application: "Drums, paint buckets", mfi: "8 g/10min", density: "0.902 g/cm³", description: "Deep blue impact copolymer engineered for industrial containers." },
  { slug: "ppcp-green", name: "PP Green", category: "PPCP", color: "Green", swatch: c("#15803d"), application: "Buckets, industrial moulding", mfi: "9 g/10min", density: "0.902 g/cm³", description: "Forest-green impact copolymer with high stiffness." },
  { slug: "ppcp-black", name: "PP Black", category: "PPCP", color: "Black", swatch: c("#0a0a0a"), application: "Drums, automotive parts", mfi: "8 g/10min", density: "0.902 g/cm³", description: "High-impact black copolymer for demanding industrial use." },
  { slug: "ppcp-total-blue", name: "PP Total Blue", category: "PPCP", color: "Total Blue", swatch: c("#1e40af"), application: "Containers, drums", mfi: "8 g/10min", density: "0.902 g/cm³", description: "Premium total-blue copolymer with full-batch colour consistency." },
  { slug: "ppcp-total-grey", name: "PP Total Grey", category: "PPCP", color: "Total Grey", swatch: c("#6b7280"), application: "Industrial parts, automotive", mfi: "9 g/10min", density: "0.902 g/cm³", description: "Engineered grey copolymer for technical components." },
  { slug: "ppcp-orange", name: "PP Orange", category: "PPCP", color: "Orange", swatch: c("#f97316"), application: "Buckets, household goods", mfi: "9 g/10min", density: "0.902 g/cm³", description: "Vibrant orange copolymer with high impact strength." },
  { slug: "ppcp-natural", name: "PP Natural", category: "PPCP", color: "Natural", swatch: c("#f5f5dc"), application: "Custom compounding base", mfi: "10 g/10min", density: "0.902 g/cm³", description: "Natural copolymer base for custom colour development and compounding." },
];

export const productCategories = [
  { key: "PPHP", title: "PP Homopolymer (PPHP)", description: "High-stiffness homopolymer granules for moulding and extrusion." },
  { key: "PPCP", title: "PP Copolymer (PPCP)", description: "Impact-modified copolymer for structural industrial containers." },
  { key: "Compounds", title: "Custom Compounds", description: "Application-tuned polypropylene compounds with controlled MFI." },
  { key: "Masterbatch", title: "Color Masterbatch", description: "Concentrated colour masterbatches for plastics processors." },
  { key: "Custom", title: "Custom Colors", description: "Bespoke shade development with strict batch-to-batch consistency." },
] as const;

export const industries = [
  { slug: "automotive", name: "Automotive", blurb: "Lightweight, high-impact PP for trims, housings, and under-the-hood." },
  { slug: "packaging", name: "Packaging", blurb: "Thin-wall containers, caps, and closures with stable melt flow." },
  { slug: "paint", name: "Paint Industry", blurb: "High-impact white and coloured PPCP for paint pails and buckets." },
  { slug: "household", name: "Household", blurb: "Durable, colour-rich PP for everyday consumer products." },
  { slug: "textile", name: "Textile", blurb: "Engineered grades for spinning, weaving, and non-woven applications." },
  { slug: "industrial", name: "Industrial", blurb: "Drums, crates, and technical components for heavy industry." },
];
