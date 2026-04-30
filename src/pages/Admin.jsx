import { db } from '../lib/supabase-db.js';

import { useState, useEffect } from "react";

import { Loader2 } from "lucide-react";
import AdminResources from "../components/admin/AdminResources";
import AdminInquiries from "../components/admin/AdminInquiries";
import AdminTestimonials from "../components/admin/AdminTestimonials";

const tabs = [
  { id: "resources", label: "Resources" },
  { id: "inquiries", label: "Inquiries" },
  { id: "testimonials", label: "Testimonials" },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("resources");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.auth.me().then(u => {
      setUser(u);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="max-w-6xl mx-auto px-5 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold text-foreground">Access Denied</h1>
        <p className="text-muted-foreground mt-2">You need admin access to view this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-6">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === t.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "resources" && <AdminResources />}
      {activeTab === "inquiries" && <AdminInquiries />}
      {activeTab === "testimonials" && <AdminTestimonials />}
    </div>
  );
}