// Reusable card with hand-drawn SVG doodle border
export default function DoodleCard({ children, className = "", color = "sage" }) {
  const colors = {
    sage: { stroke: "#B2AC88", shadow: "rgba(178,172,136,0.5)" },
    amber: { stroke: "#FFBF00", shadow: "rgba(255,191,0,0.4)" },
    brown: { stroke: "#7A5F3E", shadow: "rgba(122,95,62,0.3)" },
  };
  const c = colors[color] || colors.sage;

  return (
    <div className={`relative ${className}`}>
      {/* SVG doodle border overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 2 }}
      >
        <rect
          x="3" y="3"
          width="calc(100% - 6px)" height="calc(100% - 6px)"
          rx="22" ry="22"
          fill="none"
          stroke={c.stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="8 4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Content */}
      <div
        className="relative rounded-3xl bg-cream overflow-hidden"
        style={{
          zIndex: 1,
          boxShadow: `4px 4px 0px ${c.shadow}`,
        }}
      >
        {children}
      </div>
    </div>
  );
}