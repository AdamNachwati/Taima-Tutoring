import { db } from '../../lib/supabase-db.js';

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const emptyForm = { name: "", role: "", content: "", featured: true };
  const [form, setForm] = useState(emptyForm);

  const load = () => {
    db.entities.Testimonial.list("-created_date", 100).then(t => {
      setTestimonials(t);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    if (editing) {
      await db.entities.Testimonial.update(editing.id, form);
    } else {
      await db.entities.Testimonial.create(form);
    }
    setSaving(false);
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this testimonial?")) return;
    await db.entities.Testimonial.delete(id);
    load();
  };

  const openEdit = (t) => {
    setForm({ name: t.name || "", role: t.role || "", content: t.content || "", featured: t.featured ?? true });
    setEditing(t);
    setShowForm(true);
  };

  if (loading) return <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">{testimonials.length} testimonial(s)</p>
        <Button onClick={() => { setForm(emptyForm); setEditing(null); setShowForm(true); }} size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Testimonial
        </Button>
      </div>

      {testimonials.length === 0 ? (
        <p className="text-center py-10 text-muted-foreground">No testimonials yet.</p>
      ) : (
        <div className="space-y-3">
          {testimonials.map(t => (
            <div key={t.id} className="border border-border rounded-lg p-4 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{t.name}</p>
                  {t.role && <span className="text-xs text-muted-foreground">· {t.role}</span>}
                  {t.featured && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Featured</span>}
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">"{t.content}"</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={() => openEdit(t)}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={(o) => { if (!o) { setShowForm(false); setEditing(null); } }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">{editing ? "Edit Testimonial" : "New Testimonial"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input value={form.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Role (e.g. Parent, Student)</Label>
              <Input value={form.role} onChange={(e) => update("role", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Testimonial *</Label>
              <Textarea rows={4} value={form.content} onChange={(e) => update("content", e.target.value)} />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.featured} onCheckedChange={(v) => update("featured", v)} />
              <Label>Show on home page</Label>
            </div>
            <Button className="w-full" onClick={handleSave} disabled={saving}>
              {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...</> : editing ? "Save Changes" : "Add Testimonial"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}