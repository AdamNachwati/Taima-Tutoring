import { db } from '../../lib/supabase-db.js';

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Eye, Mail, Phone } from "lucide-react";

const statusColors = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  booked: "bg-green-100 text-green-700",
  archived: "bg-gray-100 text-gray-500",
};

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = () => {
    db.entities.TutoringInquiry.list("-created_date", 100).then(i => {
      setInquiries(i);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await db.entities.TutoringInquiry.update(id, { status });
    load();
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  if (loading) return <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin" /></div>;

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">{inquiries.length} inquiry(ies)</p>

      {inquiries.length === 0 ? (
        <p className="text-center py-10 text-muted-foreground">No inquiries yet.</p>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Subject</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Grade</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map(inq => (
                <tr key={inq.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{inq.name}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{inq.subject}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{inq.grade}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[inq.status] || statusColors.new}`}>
                      {inq.status || "new"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon" onClick={() => setSelected(inq)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => { if (!o) setSelected(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Inquiry from {selected?.name}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 mt-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${selected.email}`} className="text-primary hover:underline">{selected.email}</a>
              </div>
              {selected.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{selected.phone}</span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Subject</p>
                  <p className="font-medium">{selected.subject}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Grade</p>
                  <p className="font-medium">{selected.grade}</p>
                </div>
              </div>
              {selected.goals && (
                <div className="text-sm">
                  <p className="text-muted-foreground mb-1">Goals</p>
                  <p>{selected.goals}</p>
                </div>
              )}
              {selected.availability && (
                <div className="text-sm">
                  <p className="text-muted-foreground mb-1">Availability</p>
                  <p>{selected.availability}</p>
                </div>
              )}
              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Update status</p>
                <Select value={selected.status || "new"} onValueChange={(v) => updateStatus(selected.id, v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="booked">Booked</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}