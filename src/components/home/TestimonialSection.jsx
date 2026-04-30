const cardColors = [
  { bg: "#F4FAF5", border: "#A8D5B5" },
  { bg: "#fff", border: "#2E8B57" },
  { bg: "#E8F5EC", border: "#A8D5B5" },
];

export default function TestimonialSection({ testimonials }) {
  if (!testimonials || testimonials.length === 0) return null;
  return (
    <section style={{ background: "#F4FAF5", padding: "72px 0" }}>
      <div className="max-w-5xl mx-auto px-5">
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(42px,6vw,68px)", fontWeight: 700, color: "#1A3028", textAlign: "center", marginBottom: "12px" }}>
          What families say
        </h2>
        <p style={{ textAlign: "center", color: "#3A6B50", fontSize: "16px", marginBottom: "48px" }}>⭐⭐⭐⭐⭐</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <div key={t.id} style={{ background: cardColors[i].bg, border: `2px solid ${cardColors[i].border}`, borderRadius: "1.5rem", padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <p style={{ fontSize: "15px", color: "#1A3028", lineHeight: 1.65, fontWeight: 500, flex: 1 }}>"{t.content}"</p>
              <div style={{ borderTop: `2px dashed ${cardColors[i].border}`, paddingTop: "14px" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: 700, color: "#1A5C3A" }}>{t.name}</p>
                {t.role && <p style={{ fontSize: "13px", color: "#3A6B50", fontWeight: 600 }}>{t.role}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}