const subjectStyle = {
  "Math":           { bg: "#E8F5EC", border: "#2E8B57", color: "#1A5C3A" },
  "Science":        { bg: "#EDF7FF", border: "#5B9BD5", color: "#1A3A5C" },
  "Math & Science": { bg: "#F0FBF0", border: "#3CB371", color: "#1A5C3A" },
};

export default function ResourceCard({ resource, onClick }) {
  const s = subjectStyle[resource.subject] || subjectStyle["Math"];

  return (
    <button
      onClick={onClick}
      style={{
        all: "unset", display: "block", cursor: "pointer", width: "100%",
        background: "#fff", borderRadius: "1.75rem",
        border: "2.5px solid #A8D5B5",
        boxShadow: "4px 4px 0px #A8D5B5",
        transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
        overflow: "hidden",
      }}
      className="chalk-card-btn"
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "6px 6px 0px #2E8B57"; e.currentTarget.style.borderColor = "#2E8B57"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "4px 4px 0px #A8D5B5"; e.currentTarget.style.borderColor = "#A8D5B5"; }}
    >
      {/* Thumbnail */}
      {resource.thumbnail_url ? (
        <div style={{ aspectRatio: "4/3", overflow: "hidden", background: "#F4FAF5" }}>
          <img src={resource.thumbnail_url} alt={resource.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }} />
        </div>
      ) : (
        <div style={{ aspectRatio: "4/3", background: "#E8F5EC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "56px" }}>
          📄
        </div>
      )}

      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "10px", alignItems: "center" }}>
          <span style={{ background: s.bg, color: s.color, border: `1.5px solid ${s.border}`, borderRadius: "2rem", padding: "3px 12px", fontSize: "12px", fontWeight: 700 }}>
            {resource.subject}
          </span>
          <span style={{ fontSize: "12px", color: "#3A6B50", fontWeight: 600 }}>{resource.grade}</span>
        </div>
        <p style={{ fontFamily: "var(--font-heading)", fontSize: "22px", fontWeight: 700, color: "#1A3028", lineHeight: 1.2, marginBottom: "6px" }}>
          {resource.title}
        </p>
        <p style={{ fontSize: "13px", color: "#3A6B50", fontWeight: 500, lineHeight: 1.5, marginBottom: "14px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
          {resource.description}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "2px dashed #E8F5EC", paddingTop: "12px" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "26px", fontWeight: 700, color: "#1A3028" }}>
            ${resource.price?.toFixed(2)} <span style={{ fontSize: "13px", fontWeight: 600, color: "#3A6B50" }}>CAD</span>
          </p>
          <span style={{ background: "#2E8B57", color: "#fff", borderRadius: "2rem", padding: "6px 16px", fontSize: "13px", fontWeight: 700 }}>
            View →
          </span>
        </div>
      </div>
    </button>
  );
}