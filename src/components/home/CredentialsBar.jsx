const stats = [
  { emoji: "🎓", label: "McMaster University", sub: "B.Sc. Mathematics & Statistics" },
  { emoji: "⏰", label: "8+ Years", sub: "Classroom & private tutoring" },
  { emoji: "📖", label: "Original Resources", sub: "Built from real classroom needs" },
];

export default function CredentialsBar() {
  return (
    <section style={{ background: "#fff", borderTop: "2px dashed #A8D5B5", borderBottom: "2px dashed #A8D5B5" }}>
      <div className="max-w-5xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", background: "#F4FAF5", borderRadius: "1.25rem", padding: "18px 20px", border: "2px solid #E8F5EC" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#E8F5EC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 }}>
                {s.emoji}
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: 700, color: "#1A3028" }}>{s.label}</p>
                <p style={{ fontSize: "13px", color: "#3A6B50", fontWeight: 500, marginTop: "2px" }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}