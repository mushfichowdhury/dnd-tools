import Link from "next/link";

const tools = [
  {
    href: "/dnd-beginner-guide",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden="true">
        <path
          d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 2v6h6M8 13h8M8 17h5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    name: "Character Creator",
    tagline: "Beginner's Guide",
    description:
      "Build your first hero step-by-step. Explore races, classes, and subclasses from the Player's Handbook and beyond.",
    accent: "from-indigo-500/20 to-purple-500/20",
    border: "border-indigo-500/20 hover:border-indigo-400/50",
    iconColor: "text-indigo-400",
  },
  {
    href: "/dnd-spell-archive",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden="true">
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    name: "Spell Archive",
    tagline: "5e Spell Library",
    description:
      "Search and filter the complete D&D 5e spell library by class, level, and school of magic.",
    accent: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/20 hover:border-blue-400/50",
    iconColor: "text-blue-400",
  },
  {
    href: "/dnd-combat-tracker",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden="true">
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    name: "Combat Tracker",
    tagline: "Initiative & HP",
    description:
      "Track initiative order, hit points, and conditions across your entire party and encounters.",
    accent: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/20 hover:border-emerald-400/50",
    iconColor: "text-emerald-400",
  },
  {
    href: "/dnd-enemy-hoard-generator",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden="true">
        <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M10 8h4M12 6v4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M3 21c0-3.87 4.03-7 9-7s9 3.13 9 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    name: "Enemy Horde Generator",
    tagline: "Encounter Builder",
    description:
      "Generate balanced enemy encounters filtered by terrain, theme, and challenge rating.",
    accent: "from-rose-500/20 to-orange-500/20",
    border: "border-rose-500/20 hover:border-rose-400/50",
    iconColor: "text-rose-400",
  },
];

function D20Icon() {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className="w-16 h-16"
      aria-hidden="true"
    >
      {/* Outer polygon */}
      <polygon
        points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      {/* Inner lines for d20 face */}
      <polygon
        points="50,18 78,33 78,67 50,82 22,67 22,33"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      <line x1="50" y1="5" x2="50" y2="18" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="95" y1="27.5" x2="78" y2="33" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="95" y1="72.5" x2="78" y2="67" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="50" y1="95" x2="50" y2="82" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="5" y1="72.5" x2="22" y2="67" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="5" y1="27.5" x2="22" y2="33" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      {/* 20 text */}
      <text
        x="50"
        y="57"
        textAnchor="middle"
        fontSize="22"
        fontWeight="bold"
        fill="currentColor"
        fontFamily="Georgia, serif"
      >
        20
      </text>
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen isolate flex flex-col">
      {/* Radial gradient backdrop */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(139,92,246,0.1) 0%, transparent 45%)",
        }}
      />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <div className="text-indigo-400 mb-6">
          <D20Icon />
        </div>

        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-wide text-white text-glow mb-4">
          D&amp;D Tools
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-lg">
          Your complete toolkit for tabletop adventure
        </p>

        <div className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
      </section>

      {/* Tool cards grid */}
      <section className="relative flex-1 w-full max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`group block rounded-2xl border bg-gray-900/60 backdrop-blur-sm p-6 card-celestial ${tool.border} transition-all duration-300`}
            >
              <div className={`inline-flex rounded-xl bg-gradient-to-br p-3 mb-4 ${tool.accent}`}>
                <span className={tool.iconColor}>{tool.icon}</span>
              </div>

              <div className="mb-1 flex items-baseline gap-2">
                <h2 className="font-heading text-lg font-semibold text-white">
                  {tool.name}
                </h2>
                <span className="text-xs text-gray-500 font-medium">{tool.tagline}</span>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {tool.description}
              </p>

              <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors">
                Launch
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800/60 py-8 text-center text-sm text-gray-600">
        <a
          href="https://github.com/mushfichowdhury/dnd-tools"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition-colors"
        >
          github.com/mushfichowdhury/dnd-tools
        </a>
      </footer>
    </main>
  );
}
