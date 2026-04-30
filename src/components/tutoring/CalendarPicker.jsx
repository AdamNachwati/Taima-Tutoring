import { useState } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM",
  "7:00 PM",
];

// Simulate some slots being unavailable
const UNAVAILABLE = new Set(["9:00 AM", "2:00 PM", "5:00 PM"]);

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPicker({ selectedDate, selectedTime, onDateChange, onTimeChange }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isPast = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0,0,0,0);
    const t = new Date(); t.setHours(0,0,0,0);
    return d < t;
  };
  const isWeekend = (day) => {
    const dow = new Date(viewYear, viewMonth, day).getDay();
    return dow === 0; // Sundays off
  };
  const isSelected = (day) => {
    if (!selectedDate) return false;
    return selectedDate.getFullYear() === viewYear && selectedDate.getMonth() === viewMonth && selectedDate.getDate() === day;
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "36px", fontWeight: 700, color: "#1A3028", marginBottom: "8px" }}>
        2. Pick a date & time
      </h2>
      <p style={{ color: "#3A6B50", fontSize: "15px", marginBottom: "24px", fontWeight: 500 }}>
        Tap a date, then choose a time slot.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div style={{ background: "#fff", borderRadius: "1.5rem", border: "2px solid #A8D5B5", overflow: "hidden" }}>
          {/* Month header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "2px dashed #E8F5EC", background: "#F4FAF5" }}>
            <button onClick={prevMonth} style={{ all: "unset", cursor: "pointer", width: "36px", height: "36px", borderRadius: "50%", background: "#E8F5EC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 700, color: "#1A5C3A" }}>‹</button>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "22px", fontWeight: 700, color: "#1A3028" }}>{MONTHS[viewMonth]} {viewYear}</p>
            <button onClick={nextMonth} style={{ all: "unset", cursor: "pointer", width: "36px", height: "36px", borderRadius: "50%", background: "#E8F5EC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 700, color: "#1A5C3A" }}>›</button>
          </div>

          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", padding: "10px 12px 4px" }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: "12px", fontWeight: 700, color: "#3A6B50", padding: "4px 0" }}>{d}</div>
            ))}
          </div>

          {/* Dates */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", padding: "4px 12px 16px", gap: "4px" }}>
            {cells.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />;
              const disabled = isPast(day) || isWeekend(day);
              const sel = isSelected(day);
              return (
                <button
                  key={day}
                  disabled={disabled}
                  onClick={() => { onDateChange(new Date(viewYear, viewMonth, day)); onTimeChange(null); }}
                  style={{
                    all: "unset", cursor: disabled ? "not-allowed" : "pointer",
                    width: "100%", aspectRatio: "1", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: "14px",
                    background: sel ? "#2E8B57" : "transparent",
                    color: disabled ? "#C8DDD0" : sel ? "#fff" : "#1A3028",
                    transition: "background 0.12s",
                  }}
                  onMouseEnter={e => { if (!disabled && !sel) e.currentTarget.style.background = "#E8F5EC"; }}
                  onMouseLeave={e => { if (!disabled && !sel) e.currentTarget.style.background = "transparent"; }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time slots */}
        <div>
          {selectedDate ? (
            <>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: 700, color: "#1A3028", marginBottom: "12px" }}>
                {selectedDate.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" })}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {TIME_SLOTS.map(t => {
                  const unavail = UNAVAILABLE.has(t);
                  const isSel = selectedTime === t;
                  return (
                    <button
                      key={t}
                      disabled={unavail}
                      onClick={() => onTimeChange(t)}
                      style={{
                        all: "unset", cursor: unavail ? "not-allowed" : "pointer",
                        padding: "14px 0", borderRadius: "1rem", textAlign: "center",
                        fontWeight: 700, fontSize: "15px",
                        background: isSel ? "#2E8B57" : unavail ? "#F0F0F0" : "#E8F5EC",
                        color: isSel ? "#fff" : unavail ? "#bbb" : "#1A5C3A",
                        border: isSel ? "2px solid #1A5C3A" : "2px solid transparent",
                        transition: "all 0.12s",
                        textDecoration: unavail ? "line-through" : "none",
                      }}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#F4FAF5", borderRadius: "1.5rem", border: "2px dashed #A8D5B5", padding: "40px", textAlign: "center" }}>
              <p style={{ color: "#A8D5B5", fontFamily: "var(--font-heading)", fontSize: "22px", fontWeight: 700 }}>← Pick a date first</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}