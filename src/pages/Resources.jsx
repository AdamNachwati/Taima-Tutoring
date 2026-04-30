import { db } from '../lib/supabase-db.js';

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ResourceCard from "../components/ResourceCard";
import ResourceDetailModal from "../components/ResourceDetailModal";

export default function Resources() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    db.entities.Resource.filter({ status: "published" }, "-created_date", 50)
      .then(setResources).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (id && resources.length > 0) {
      const found = resources.find(r => r.id === id);
      if (found) setSelected(found);
    }
  }, [id, resources]);

  const subjects = ["All", ...new Set(resources.map(r => r.subject).filter(Boolean))];
  const filtered = filter === "All" ? resources : resources.filter(r => r.subject === filter);

  return (
    <div style={{ background: "#F4FAF5", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "#1A5C3A", padding: "48px 20px 40px" }}>
        <div className="max-w-5xl mx-auto">
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(48px,8vw,80px)", fontWeight: 700, color: "#fff", lineHeight: 1.05, marginBottom: "10px" }}>
            Resource Library.
          </h1>
          <p style={{ color: "#A8D5B5", fontSize: "17px", fontWeight: 500 }}>
            Click any card to preview & purchase instantly. 📚
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-10">
        {/* Filter pills */}
        {subjects.length > 2 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "32px" }}>
            {subjects.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  all: "unset", cursor: "pointer",
                  padding: "10px 24px", borderRadius: "2rem",
                  fontWeight: 700, fontSize: "14px",
                  background: filter === s ? "#2E8B57" : "#fff",
                  color: filter === s ? "#fff" : "#2E8B57",
                  border: filter === s ? "2px solid #1A5C3A" : "2px solid #A8D5B5",
                  boxShadow: filter === s ? "3px 3px 0 #1A5C3A" : "none",
                  transition: "all 0.12s",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 0", gap: "16px" }}>
            <span style={{ fontSize: "48px" }}>📚</span>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "28px", color: "#A8D5B5", fontWeight: 700 }}>Loading...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <span style={{ fontSize: "56px" }}>📭</span>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "32px", color: "#A8D5B5", fontWeight: 700, marginTop: "16px" }}>No resources yet!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(r => (
              <ResourceCard key={r.id} resource={r} onClick={() => { setSelected(r); navigate(`/resources/${r.id}`, { replace: true }); }} />
            ))}
          </div>
        )}
      </div>

      <ResourceDetailModal resource={selected} open={!!selected} onClose={() => { setSelected(null); navigate("/resources", { replace: true }); }} />
    </div>
  );
}