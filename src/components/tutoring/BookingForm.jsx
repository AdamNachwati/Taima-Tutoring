import { db } from '../../lib/supabase-db.js';
import { loadStripe } from '@stripe/stripe-js';


import { useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const grades = ["Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"];

const inputStyle = {
  width: "100%", padding: "14px 16px", borderRadius: "1rem",
  border: "2px solid #A8D5B5", background: "#F4FAF5",
  fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 500, color: "#1A3028",
  outline: "none", boxSizing: "border-box",
};

export default function BookingForm({ pkg, date, time, onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", grade: "", subject: pkg?.name || "", goals: "" });
  const [submitting, setSubmitting] = useState(false);

  const update = (f, v) => setForm(p => ({ ...p, [f]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      console.log('Starting Stripe checkout simulation...');
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      if (!stripe) {
        alert('Stripe failed to load');
        return;
      }
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: parseInt(pkg.price.replace('$', '')), pkg: pkg.name, email: form.email }),
      });
      if (!response.ok) throw new Error('Failed to create session');
      const { id } = await response.json();
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "36px", fontWeight: 700, color: "#1A3028", marginBottom: "8px" }}>
        3. Your details
      </h2>
      <p style={{ color: "#3A6B50", fontSize: "15px", marginBottom: "24px", fontWeight: 500 }}>
        Almost there — just a few quick fields.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label style={{ display: "block", fontWeight: 700, fontSize: "13px", color: "#3A6B50", marginBottom: "5px" }}>Name *</label>
            <input required style={inputStyle} placeholder="Parent or student name" value={form.name} onChange={e => update("name", e.target.value)} />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 700, fontSize: "13px", color: "#3A6B50", marginBottom: "5px" }}>Email *</label>
            <input type="email" required style={inputStyle} placeholder="your@email.com" value={form.email} onChange={e => update("email", e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label style={{ display: "block", fontWeight: 700, fontSize: "13px", color: "#3A6B50", marginBottom: "5px" }}>Grade *</label>
            <Select required value={form.grade} onValueChange={v => update("grade", v)}>
              <SelectTrigger style={{ ...inputStyle, display: "flex", alignItems: "center", cursor: "pointer" }}>
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                {grades.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 700, fontSize: "13px", color: "#3A6B50", marginBottom: "5px" }}>Phone (optional)</label>
            <input style={inputStyle} placeholder="(optional)" value={form.phone} onChange={e => update("phone", e.target.value)} />
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontWeight: 700, fontSize: "13px", color: "#3A6B50", marginBottom: "5px" }}>What do you need help with? (optional)</label>
          <textarea rows={3} style={{ ...inputStyle, resize: "vertical" }} placeholder="E.g., struggling with algebra, exam prep..." value={form.goals} onChange={e => update("goals", e.target.value)} />
        </div>

        {/* Summary box */}
        <div style={{ background: "#E8F5EC", borderRadius: "1.25rem", padding: "16px 20px", border: "2px solid #A8D5B5", display: "flex", flexDirection: "column", gap: "6px" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: 700, color: "#1A3028" }}>Your booking summary</p>
          <p style={{ fontSize: "14px", color: "#3A6B50", fontWeight: 600 }}>📦 {pkg?.name} — {pkg?.price}</p>
          <p style={{ fontSize: "14px", color: "#3A6B50", fontWeight: 600 }}>
            📅 {date ? date.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" }) : "No date selected"} {time ? `at ${time}` : ""}
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting || !pkg || !date || !time}
          className="btn-primary"
          style={{ width: "100%", opacity: (!pkg || !date || !time) ? 0.5 : 1, cursor: (!pkg || !date || !time) ? "not-allowed" : "pointer" }}
        >
          {submitting ? <><Loader2 style={{ width: "18px", height: "18px", animation: "spin 1s linear infinite" }} /> Sending...</> : "✅ Confirm Booking Request"}
        </button>
        <p style={{ textAlign: "center", fontSize: "12px", color: "#A8D5B5", fontWeight: 600 }}>I'll confirm your time within 24 hours. 💚</p>
      </form>
    </div>
  );
}