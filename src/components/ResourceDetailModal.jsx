import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function ResourceDetailModal({ resource, open, onClose }) {
  if (!resource) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent style={{ maxWidth: "560px", borderRadius: "1.75rem", border: "2.5px solid #2E8B57", background: "#fff", boxShadow: "6px 6px 0px #A8D5B5", maxHeight: "90vh", overflowY: "auto" }}>
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-heading)", fontSize: "32px", fontWeight: 700, color: "#1A3028" }}>
            {resource.title}
          </DialogTitle>
        </DialogHeader>

        <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Image */}
          {(resource.preview_url || resource.thumbnail_url) && (
            <div style={{ borderRadius: "1.25rem", overflow: "hidden", border: "2px solid #E8F5EC" }}>
              <img src={resource.preview_url || resource.thumbnail_url} alt={resource.title} style={{ width: "100%", maxHeight: "260px", objectFit: "cover", display: "block" }} />
            </div>
          )}

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[resource.subject, resource.grade, resource.format, resource.page_count ? `${resource.page_count} pages` : null].filter(Boolean).map((tag, i) => (
              <span key={i} style={{ background: "#E8F5EC", color: "#1A5C3A", border: "1.5px solid #A8D5B5", borderRadius: "2rem", padding: "4px 14px", fontSize: "13px", fontWeight: 700 }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p style={{ fontSize: "15px", color: "#3A6B50", lineHeight: 1.65, fontWeight: 500 }}>
            {resource.long_description || resource.description}
          </p>

          {/* Who / What */}
          {resource.who_is_it_for && (
            <div style={{ background: "#F4FAF5", borderRadius: "1rem", padding: "16px", border: "2px dashed #A8D5B5" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: 700, color: "#1A3028", marginBottom: "4px" }}>👤 Who it's for</p>
              <p style={{ fontSize: "14px", color: "#3A6B50", fontWeight: 500 }}>{resource.who_is_it_for}</p>
            </div>
          )}
          {resource.what_is_included && (
            <div style={{ background: "#F4FAF5", borderRadius: "1rem", padding: "16px", border: "2px dashed #A8D5B5" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: 700, color: "#1A3028", marginBottom: "4px" }}>📦 What's included</p>
              <p style={{ fontSize: "14px", color: "#3A6B50", fontWeight: 500 }}>{resource.what_is_included}</p>
            </div>
          )}

          {/* Price + CTA */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "2px dashed #A8D5B5", paddingTop: "18px" }}>
            <div>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "42px", fontWeight: 700, color: "#1A3028", lineHeight: 1 }}>
                ${resource.price?.toFixed(2)}
              </p>
              <p style={{ fontSize: "12px", color: "#3A6B50", fontWeight: 600 }}>CAD · Instant download</p>
            </div>
            <button
              className="btn-primary"
              style={{ height: "52px" }}
              onClick={() => alert("Payment integration coming soon! Contact us to purchase.")}
            >
              🛒 Buy Now
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}