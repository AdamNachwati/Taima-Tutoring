const packages = [
  {
    id: "trial",
    emoji: "🌱",
    name: "Trial Session",
    duration: "60 min",
    price: "$45",
    desc: "One session to see if we're a good fit.",
    highlight: false,
  },
  {
    id: "monthly",
    emoji: "📅",
    name: "Monthly Pack",
    duration: "4 × 60 min",
    price: "$160",
    desc: "One session per week for a month. Best for steady progress.",
    highlight: true,
  },
  {
    id: "intensive",
    emoji: "🚀",
    name: "Exam Intensive",
    duration: "3 × 90 min",
    price: "$195",
    desc: "Deep-dive prep before a big test or exam.",
    highlight: false,
  },
];

export default function PackageSelector({ selected, onSelect }) {
  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "36px", fontWeight: 700, color: "#1A3028", marginBottom: "8px" }}>
        1. Pick a package
      </h2>
      <p style={{ color: "#3A6B50", fontSize: "15px", marginBottom: "24px", fontWeight: 500 }}>
        Tap a card to select it.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {packages.map(pkg => {
          const isSelected = selected?.id === pkg.id;
          return (
            <button
              key={pkg.id}
              onClick={() => onSelect(pkg)}
              style={{
                all: "unset", display: "flex", flexDirection: "column", gap: "10px",
                padding: "24px", borderRadius: "1.5rem", cursor: "pointer",
                background: isSelected ? "#2E8B57" : pkg.highlight ? "#E8F5EC" : "#fff",
                border: isSelected ? "2.5px solid #1A5C3A" : `2.5px solid ${pkg.highlight ? "#2E8B57" : "#A8D5B5"}`,
                boxShadow: isSelected ? "4px 4px 0px #1A5C3A" : "4px 4px 0px #A8D5B5",
                transition: "all 0.15s",
                position: "relative",
              }}
            >
              {pkg.highlight && !isSelected && (
                <span style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#F5A623", color: "#fff", fontSize: "11px", fontWeight: 800, borderRadius: "2rem", padding: "3px 12px", whiteSpace: "nowrap" }}>
                  MOST POPULAR
                </span>
              )}
              <span style={{ fontSize: "32px" }}>{pkg.emoji}</span>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "24px", fontWeight: 700, color: isSelected ? "#fff" : "#1A3028" }}>{pkg.name}</p>
              <p style={{ fontSize: "13px", color: isSelected ? "rgba(255,255,255,0.8)" : "#3A6B50", fontWeight: 600 }}>{pkg.duration}</p>
              <p style={{ fontSize: "13px", color: isSelected ? "rgba(255,255,255,0.75)" : "#3A6B50", fontWeight: 500, lineHeight: 1.5 }}>{pkg.desc}</p>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "30px", fontWeight: 700, color: isSelected ? "#fff" : "#1A5C3A", marginTop: "4px" }}>{pkg.price}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}