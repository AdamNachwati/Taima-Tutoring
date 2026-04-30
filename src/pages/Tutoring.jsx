import { useState } from "react";
import PackageSelector from "../components/tutoring/PackageSelector";
import CalendarPicker from "../components/tutoring/CalendarPicker";
import BookingForm from "../components/tutoring/BookingForm";

const STEPS = ["Package", "Date & Time", "Details"];

export default function Tutoring() {
  const [pkg, setPkg] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [done, setDone] = useState(false);

  // Determine which steps are "reachable"
  const canGoStep = (s) => {
    if (s === 0) return true;
    if (s === 1) return !!pkg;
    if (s === 2) return !!pkg && !!date && !!time;
    return false;
  };

  // Auto-advance when step is complete
  const [step, setStep] = useState(0);

  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');
  const status = urlParams.get('status');

  if (done || (sessionId === 'mock_success' && status === 'success')) {
    return (
      <div style={{ background: "#F4FAF5", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ textAlign: "center", maxWidth: "440px" }}>
          <div style={{ fontSize: "80px", marginBottom: "16px" }}>🎉</div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "56px", fontWeight: 700, color: "#1A3028", marginBottom: "12px" }}>Payment successful!</h1>
          <p style={{ color: "#3A6B50", fontSize: "16px", lineHeight: 1.65, marginBottom: "32px" }}>
            Thank you! Your booking request has been received and paid. I'll confirm your session within 24 hours. Check your inbox! 💚
          </p>
          <button className="btn-primary" onClick={() => { setDone(false); setPkg(null); setDate(null); setTime(null); setStep(0); window.history.replaceState({}, '', '/tutoring'); }} style={{ width: "100%" }}>
            Book another session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#F4FAF5", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "#1A5C3A", padding: "48px 20px 40px" }}>
        <div className="max-w-4xl mx-auto">
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(48px,8vw,80px)", fontWeight: 700, color: "#fff", lineHeight: 1.05, marginBottom: "10px" }}>
            Book a tutoring session.
          </h1>
          <p style={{ color: "#A8D5B5", fontSize: "17px", fontWeight: 500 }}>
            3 simple steps. Takes under 2 minutes. ✏️
          </p>
        </div>
      </div>

      {/* Step indicators */}
      <div style={{ background: "#fff", borderBottom: "2px dashed #A8D5B5", padding: "0 20px" }}>
        <div className="max-w-4xl mx-auto" style={{ display: "flex" }}>
          {STEPS.map((s, i) => {
            const active = step === i;
            const done_step = step > i;
            return (
              <button
                key={s}
                onClick={() => canGoStep(i) && setStep(i)}
                style={{
                  all: "unset", cursor: canGoStep(i) ? "pointer" : "default",
                  flex: 1, textAlign: "center", padding: "18px 8px",
                  borderBottom: active ? "3px solid #2E8B57" : "3px solid transparent",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                }}
              >
                <span style={{
                  width: "28px", height: "28px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center",
                  background: done_step ? "#2E8B57" : active ? "#2E8B57" : "#E8F5EC",
                  color: done_step || active ? "#fff" : "#3A6B50",
                  fontWeight: 800, fontSize: "14px", flexShrink: 0,
                }}>
                  {done_step ? "✓" : i + 1}
                </span>
                <span style={{ fontWeight: 700, fontSize: "14px", color: active ? "#1A3028" : "#3A6B50" }}>{s}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-4xl mx-auto px-5 py-12">
        {step === 0 && (
          <div>
            <PackageSelector selected={pkg} onSelect={(p) => { setPkg(p); setStep(1); }} />
          </div>
        )}

        {step === 1 && (
          <div>
            <CalendarPicker
              selectedDate={date}
              selectedTime={time}
              onDateChange={setDate}
              onTimeChange={setTime}
            />
            <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
              <button className="btn-outline" style={{ height: "52px", padding: "0 24px", fontSize: "15px" }} onClick={() => setStep(0)}>← Back</button>
              <button
                className="btn-primary"
                style={{ flex: 1, height: "52px", opacity: (!date || !time) ? 0.5 : 1, cursor: (!date || !time) ? "not-allowed" : "pointer" }}
                disabled={!date || !time}
                onClick={() => setStep(2)}
              >
                Continue → {date && time ? `${date.toLocaleDateString("en-CA",{month:"short",day:"numeric"})} at ${time}` : ""}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <BookingForm pkg={pkg} date={date} time={time} onSuccess={() => setDone(true)} />
            <button className="btn-outline" style={{ height: "48px", padding: "0 20px", fontSize: "14px", marginTop: "16px" }} onClick={() => setStep(1)}>← Change date</button>
          </div>
        )}
      </div>
    </div>
  );
}