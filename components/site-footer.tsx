const serviceAreas = ["Madison", "Limestone", "Morgan", "Cullman", "Lawrence"];
const services = [
  { label: "Drone Spraying", href: "#services" },
  { label: "Drone Spreading", href: "#services" },
  { label: "Fall 2026 Priority List", href: "#lead-form" },
  { label: "Free Spray + Spread Guide", href: "#spray-spread-guide" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[color:var(--color-primary)] text-[#e8e6d8]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(700px 320px at 10% 0%, rgba(212,160,23,0.25), transparent 60%), radial-gradient(900px 380px at 90% 100%, rgba(255,255,255,0.08), transparent 55%)",
        }}
      />
      <div className="container-page relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <path
                  d="M12 2.5c3 3.5 5 6.3 5 9.5a5 5 0 1 1-10 0c0-3.2 2-6 5-9.5Z"
                  fill="#f3d98a"
                />
                <circle cx="18.5" cy="5.5" r="1.4" fill="#d4a017" />
              </svg>
            </span>
            <div>
              <p className="font-heading text-xl text-white">North Alabama Drone Applicators</p>
              <p className="text-xs uppercase tracking-[0.2em] text-[#c9d3b7]">
                Spray. Spread. On your acres.
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-[#d4d6c3]">
            Managed drone spray and spreading for row-crop and pasture acres across the Tennessee Valley — certified
            pilots, insured equipment, routes built for North Alabama.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            <span className="chip chip-dark">FAA Part 107</span>
            <span className="chip chip-dark">Fully Insured</span>
            <span className="chip chip-dark">Alabama Based</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9d3b7]">
            Services
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[#e8e6d8]/90 transition-colors hover:text-[color:var(--color-accent)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9d3b7]">
            Service Area
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {serviceAreas.map((county) => (
              <li key={county} className="flex items-center gap-2 text-[#e8e6d8]/90">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[color:var(--color-accent)]" aria-hidden="true">
                  <path
                    d="M8 0a5 5 0 0 0-5 5c0 4 5 11 5 11s5-7 5-11a5 5 0 0 0-5-5Zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
                    fill="currentColor"
                  />
                </svg>
                {county} County, AL
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-6 text-xs text-[#c9d3b7] md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} North Alabama Drone Applicators. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <a href="#lead-form" className="hover:text-white">Contact</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
            <a href="#top" className="hover:text-white">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
