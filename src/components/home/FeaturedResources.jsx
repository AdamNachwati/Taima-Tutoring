import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ResourceCard from "../ResourceCard";
import ResourceDetailModal from "../ResourceDetailModal";

export default function FeaturedResources({ resources }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  if (!resources || resources.length === 0) return null;

  return (
    <section style={{ background: "#fff", padding: "72px 0" }}>
      <div className="max-w-5xl mx-auto px-5">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(42px,6vw,68px)", fontWeight: 700, color: "#1A3028", lineHeight: 1.05 }}>
              Grab a resource
            </h2>
            <p style={{ color: "#3A6B50", fontSize: "16px", marginTop: "8px", fontWeight: 500 }}>Click any card to preview & purchase instantly.</p>
          </div>
          <Link to="/resources" className="btn-outline" style={{ height: "48px", padding: "0 24px", fontSize: "15px" }}>
            See all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.slice(0, 3).map(r => (
            <ResourceCard key={r.id} resource={r} onClick={() => setSelected(r)} />
          ))}
        </div>
      </div>
      <ResourceDetailModal resource={selected} open={!!selected} onClose={() => setSelected(null)} />
    </section>
  );
}