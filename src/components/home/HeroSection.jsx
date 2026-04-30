import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroSection({ portraitUrl }) {
  return (
    <section style={{ background: "#F4FAF5", padding: "64px 0 80px" }}>
      <div className="max-w-5xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Copy */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#E8F5EC", color: "#1A5C3A", border: "1.5px solid #A8D5B5", borderRadius: "2rem", padding: "6px 18px", fontWeight: 700, fontSize: "14px", marginBottom: "20px" }}>
              🍃 Ontario Math & Science
            </div>

            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(52px, 8vw, 88px)", fontWeight: 700, color: "#1A3028", lineHeight: 1.05, marginBottom: "20px" }}>
              Learning<br />
              made <span style={{ color: "#2E8B57" }} className="squiggle-green">clear</span>.
            </h1>

            <p style={{ fontSize: "17px", color: "#3A6B50", lineHeight: 1.6, maxWidth: "380px", marginBottom: "32px", fontWeight: 500 }}>
              Expert 1-on-1 tutoring and ready-to-use resources for grades 6–12. Ontario curriculum. Real results.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <Link to="/resources" className="btn-primary">📚 Browse Resources</Link>
              <Link to="/tutoring" className="btn-outline">📅 Book a Session</Link>
            </div>
          </motion.div>

          {/* Portrait */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="hidden md:block">
            <div style={{ position: "relative", display: "inline-block" }}>
              <div style={{ position: "absolute", inset: 0, background: "#A8D5B5", borderRadius: "1.75rem", transform: "translate(6px,6px)" }} />
              <div style={{ position: "relative", borderRadius: "1.75rem", overflow: "hidden", border: "3px solid #1A5C3A", width: "340px" }}>
                <img src={portraitUrl} alt="Educator" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ position: "absolute", bottom: "-12px", left: "-20px", background: "#fff", border: "2px solid #A8D5B5", borderRadius: "1rem", padding: "10px 16px", boxShadow: "3px 3px 0 #A8D5B5", transform: "rotate(-2deg)" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: 700, color: "#1A5C3A" }}>8+ years teaching 🍎</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}