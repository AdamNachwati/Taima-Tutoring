import { db } from '../../lib/supabase-db.js';

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2, Upload } from "lucide-react";

export default function AdminResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const emptyForm = {
    title: "", description: "", long_description: "", subject: "Math", grade: "",
    price: 0, thumbnail_url: "", preview_url: "", file_url: "",
    what_is_included: "", who_is_it_for: "", page_count: 0,
    format: "PDF", featured: false, status: "published",
  };
  const [form, setForm] = useState(emptyForm);

  const load = () => {
    db.entities.Resource.list("-created_date", 100).then(r => {
      setResources(r);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleFileUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { file_url } = await db.integrations.Core.UploadFile({ file });
    update(field, file_url);
  };

  const handleSave = async () => {
    setSaving(true);
    const data = { ...form, price: Number(form.price), page_count: Number(form.page_count) };
    if (editing) {
      await db.entities.Resource.update(editing.id, data);
    } else {
      await db.entities.Resource.create(data);
    }
    setSaving(false);
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this resource?")) return;
    await db.entities.Resource.delete(id);
    load();
  };

  const openEdit = (r) => {
    setForm({
      title: r.title || "", description: r.description || "", long_description: r.long_description || "",
      subject: r.subject || "Math", grade: r.grade || "", price: r.price || 0,
      thumbnail_url: r.thumbnail_url || "", preview_url: r.preview_url || "", file_url: r.file_url || "",
      what_is_included: r.what_is_included || "", who_is_it_for: r.who_is_it_for || "",
      page_count: r.page_count || 0, format: r.format || "PDF",
      featured: r.featured || false, status: r.status || "published",
    });
    setEditing(r);
    setShowForm(true);
  };

  if (loading) return <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">{resources.length} resource(s)</p>
        <Button onClick={() => { setForm(emptyForm); setEditing(null); setShowForm(true); }} size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Resource
        </Button>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Title</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Subject</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Grade</th>
              <th className="text-left px-4 py-3 font-medium">Price</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {resources.map(r => (
              <tr key={r.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{r.title}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{r.subject}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{r.grade}</td>
                <td className="px-4 py-3">${r.price?.toFixed(2)}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${r.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex gap-1 justify-end">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(r)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={(o) => { if (!o) { setShowForm(false); setEditing(null); } }}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">{editing ? "Edit Resource" : "New Resource"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input value={form.title} onChange={(e) => update("title", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Short Description *</Label>
              <Textarea rows={2} value={form.description} onChange={(e) => update("description", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Full Description</Label>
              <Textarea rows={3} value={form.long_description} onChange={(e) => update("long_description", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={form.subject} onValueChange={(v) => update("subject", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Math">Math</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Math & Science">Math & Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Grade *</Label>
                <Input value={form.grade} onChange={(e) => update("grade", e.target.value)} placeholder="e.g. Grade 9" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price (CAD) *</Label>
                <Input type="number" step="0.01" value={form.price} onChange={(e) => update("price", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Format</Label>
                <Select value={form.format} onValueChange={(v) => update("format", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="Google Slides">Google Slides</SelectItem>
                    <SelectItem value="Word Document">Word Document</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Page Count</Label>
              <Input type="number" value={form.page_count} onChange={(e) => update("page_count", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Who is it for?</Label>
              <Input value={form.who_is_it_for} onChange={(e) => update("who_is_it_for", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>What's included?</Label>
              <Input value={form.what_is_included} onChange={(e) => update("what_is_included", e.target.value)} />
            </div>

            {/* File uploads */}
            <div className="space-y-2">
              <Label>Thumbnail Image</Label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer flex items-center gap-2 text-sm text-primary hover:underline">
                  <Upload className="h-4 w-4" /> Upload
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, "thumbnail_url")} />
                </label>
                {form.thumbnail_url && <span className="text-xs text-muted-foreground truncate max-w-[200px]">Uploaded ✓</span>}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Preview Image</Label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer flex items-center gap-2 text-sm text-primary hover:underline">
                  <Upload className="h-4 w-4" /> Upload
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, "preview_url")} />
                </label>
                {form.preview_url && <span className="text-xs text-muted-foreground truncate max-w-[200px]">Uploaded ✓</span>}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Downloadable File</Label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer flex items-center gap-2 text-sm text-primary hover:underline">
                  <Upload className="h-4 w-4" /> Upload
                  <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, "file_url")} />
                </label>
                {form.file_url && <span className="text-xs text-muted-foreground truncate max-w-[200px]">Uploaded ✓</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => update("status", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3 pt-6">
                <Switch checked={form.featured} onCheckedChange={(v) => update("featured", v)} />
                <Label>Featured</Label>
              </div>
            </div>

            <Button className="w-full" onClick={handleSave} disabled={saving}>
              {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...</> : editing ? "Save Changes" : "Create Resource"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}