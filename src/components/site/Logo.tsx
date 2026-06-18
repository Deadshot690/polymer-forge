import logo from "@/assets/kohinoor-logo.png.asset.json";
export function Logo({ className = "h-9" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src={logo.url} alt="Kohinoor Polytech" className="h-full w-auto object-contain" />
    </div>
  );
}
