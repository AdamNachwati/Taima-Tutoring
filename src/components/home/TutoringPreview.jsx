import { Link } from "react-router-dom";

export default function TutoringPreview({ imageUrl }) {
  return (
    <section style={{ background: "#E8F5EC", padding: "72px 0" }}>
      <div className="max-w-5xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* Image */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, background: "#2E8B57", borderRadius: "1.75rem", transform: "translate(6px,6px)" }} />
            <div style={{ position: "relative", borderRadius: "1.75rem", overflow: "hidden", border: "3px solid #1A5C3A" }}>
              <img src={imageUrl} alt="Tutoring" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
            </div>
          </div>

          {/* Copy */}
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(44px,6vw,72px)", fontWeight: 700, color: "#1A3028", lineHeight: 1.05, marginBottom: "16px" }}>
              1-on-1 tutoring that <span style={{ color: "#2E8B57" }}>sticks</span>.
            </h2>
            <p style={{ color: "#3A6B50", fontSize: "16px", lineHeight: 1.65, marginBottom: "24px", fontWeight: 500 }}>
              Grades 6–12 · Math & Science · Ontario curriculum · Online or in-person.
            </p>
            <Link to="/tutoring" className="btn-primary" style={{ width: "fit-content" }}>
              📅 Book a Session
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}