import { db } from '../lib/supabase-db.js';

import { useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const grades = ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
const subjects = ["Math", "Science", "Both Math & Science"];

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "1rem",
  border: "2px solid #D4D0B8",
  background: "#FFFDE8",
  fontFamily: "var(--font-body)",
  fontSize: "15px",
  fontWeight: 500,
  color: "#3D2E1E",
  outline: "none",
  transition: "border-color 0.15s",
};

const labelStyle = {
  display: "block",
  fontFamily: "var(--font-body)",
  fontWeight: 700,
  fontSize: "14px",
  color: "#7A5F3E",
  marginBottom: "6px",
};

export default function InquiryForm() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", grade: "", subject: "", goals: "", availability: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await db.entities.TutoringInquiry.create(form);
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="font-heading text-3xl font-bold" style={{ color: "#3D2E1E" }}>Thank you!</h3>
        <p className="font-body text-sm mt-2" style={{ color: "#7A5F3E", fontWeight: 500 }}>
          I received your inquiry and will get back to you within 24 hours. 💛
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Name *</label>
          <input
            required
            style={{ ...inputStyle, borderColor: focused === "name" ? "#FFBF00" : "#D4D0B8" }}
            placeholder="Parent or student name"
            value={form.name}
            onChange={e => update("name", e.target.value)}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
          />
        </div>
        <div>
          <label style={labelStyle}>Email *</label>
          <input
            type="email"
            required
            style={{ ...inputStyle, borderColor: focused === "email" ? "#FFBF00" : "#D4D0B8" }}
            placeholder="your@email.com"
            value={form.email}
            onChange={e => update("email", e.target.value)}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Phone (optional)</label>
          <input
            style={{ ...inputStyle, borderColor: focused === "phone" ? "#FFBF00" : "#D4D0B8" }}
            placeholder="(optional)"
            value={form.phone}
            onChange={e => update("phone", e.target.value)}
            onFocus={() => setFocused("phone")}
            onBlur={() => setFocused(null)}
          />
        </div>
        <div>
          <label style={labelStyle}>Grade *</label>
          <Select required value={form.grade} onValueChange={v => update("grade", v)}>
            <SelectTrigger
              style={{ ...inputStyle, display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              {grades.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Subject *</label>
        <Select required value={form.subject} onValueChange={v => update("subject", v)}>
          <SelectTrigger style={{ ...inputStyle, display: "flex", alignItems: "center", cursor: "pointer" }}>
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label style={labelStyle}>What does the student need help with?</label>
        <textarea
          rows={3}
          style={{ ...inputStyle, borderColor: focused === "goals" ? "#FFBF00" : "#D4D0B8", resize: "vertical" }}
          placeholder="E.g., struggling with algebra, preparing for exams, building confidence..."
          value={form.goals}
          onChange={e => update("goals", e.target.value)}
          onFocus={() => setFocused("goals")}
          onBlur={() => setFocused(null)}
        />
      </div>

      <div>
        <label style={labelStyle}>Availability</label>
        <input
          style={{ ...inputStyle, borderColor: focused === "avail" ? "#FFBF00" : "#D4D0B8" }}
          placeholder="E.g., weekday evenings, Saturday mornings"
          value={form.availability}
          onChange={e => update("availability", e.target.value)}
          onFocus={() => setFocused("avail")}
          onBlur={() => setFocused(null)}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="chalk-btn amber-btn w-full flex items-center justify-center gap-2"
        style={{ height: "52px", fontSize: "16px", fontWeight: 800, borderRadius: "1.5rem", cursor: submitting ? "not-allowed" : "pointer" }}
      >
        {submitting ? (
          <><Loader2 className="h-5 w-5 animate-spin" /> Sending...</>
        ) : (
          "✉️ Send Inquiry"
        )}
      </button>

      <p className="text-center font-body text-xs" style={{ color: "#B2AC88" }}>
        I'll respond within 24 hours. No spam, ever. 🤝
      </p>
    </form>
  );
}