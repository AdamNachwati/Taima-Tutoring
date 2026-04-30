import { db } from '../lib/supabase-db.js';

import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Layout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);
  useEffect(() => {
    db.auth.me().then(u => { if (u?.role === "admin") setIsAdmin(true); }).catch(() => {});
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/resources", label: "Resources" },
    { to: "/tutoring", label: "Tutoring" },
  ];
  if (isAdmin) navLinks.push({ to: "/admin", label: "Admin" });
  const isActive = (p) => location.pathname === p;

  return (
    <div style={{ background: "#F4FAF5", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "var(--font-body)" }}>
      {/* Nav */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(244,250,245,0.95)", backdropFilter: "blur(10px)", borderBottom: "2px dashed #A8D5B5" }}>
        <div className="max-w-5xl mx-auto px-5 flex items-center justify-between" style={{ height: "64px" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "12px", background: "#2E8B57", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🍃</div>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: "26px", fontWeight: 700, color: "#1A5C3A" }}>StratfordSTEM</span>
          </Link>

          {/* Desktop */}
          <nav style={{ display: "flex", gap: "4px" }} className="hidden md:flex">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} style={{
                padding: "8px 20px", borderRadius: "2rem", fontWeight: 700, fontSize: "15px", textDecoration: "none",
                background: isActive(l.to) ? "#2E8B57" : "transparent",
                color: isActive(l.to) ? "#fff" : "#2E8B57",
                transition: "background 0.15s",
              }}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <Link to="/tutoring" className="md:hidden btn-primary" style={{ height: "40px", padding: "0 18px", fontSize: "14px", boxShadow: "3px 3px 0 #1A5C3A" }}>
            Book Now
          </Link>
        </div>
        {/* Mobile full nav */}
        <div className="md:hidden" style={{ borderTop: "2px dashed #A8D5B5", padding: "10px 20px", display: "flex", gap: "8px" }}>
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} style={{
              flex: 1, textAlign: "center", padding: "10px 0", borderRadius: "1rem", fontWeight: 700, fontSize: "14px", textDecoration: "none",
              background: isActive(l.to) ? "#2E8B57" : "#E8F5EC",
              color: isActive(l.to) ? "#fff" : "#1A5C3A",
            }}>
              {l.label}
            </Link>
          ))}
        </div>
      </header>

      <main style={{ flex: 1 }}><Outlet /></main>

      {/* Footer */}
      <footer style={{ background: "#1A5C3A", color: "#fff" }}>
        <div className="max-w-5xl mx-auto px-5 py-12">
          <div className="flex flex-col md:flex-row md:justify-between gap-8">
            <div>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "32px", fontWeight: 700 }}>StratfordSTEM</p>
              <p style={{ color: "#A8D5B5", fontSize: "14px", marginTop: "6px" }}>Math & science support for Ontario students. 🍎</p>
            </div>
            <div style={{ display: "flex", gap: "32px" }}>
              {navLinks.filter(l => l.to !== "/admin").map(l => (
                <Link key={l.to} to={l.to} style={{ color: "#A8D5B5", fontWeight: 700, textDecoration: "none", fontSize: "15px" }}>{l.label}</Link>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(168,213,181,0.3)", marginTop: "32px", paddingTop: "16px", color: "#A8D5B5", fontSize: "13px" }}>
            © {new Date().getFullYear()} StratfordSTEM · Ontario, Canada
          </div>
        </div>
      </footer>
    </div>
  );
}