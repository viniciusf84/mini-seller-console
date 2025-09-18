import { useEffect, useState } from "react";
import { Lead, Opportunity } from "../types";
import { isValidEmail } from "@utils/email";
import { simulateSave } from "@utils/fakeApi";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = {
  lead: Lead | null;
  onClose: () => void;
  onSave: (lead: Lead) => void;
  onConvert: (opp: Opportunity) => void;
  showToast: (message: string) => void;
};

export default function LeadDetailPanel({
  lead,
  onClose,
  onSave,
  onConvert,
  showToast,
}: Props) {
  const [local, setLocal] = useState<Lead | null>(lead);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setLocal(lead), [lead]);

  const isOpen = !!lead;

  const update = (field: keyof Lead, value: any) => {
    if (!local) return;
    setLocal({ ...local, [field]: value });
  };

  const handleSave = async () => {
    if (!local || !lead) return;
    setError(null);
    if (!isValidEmail(local.email)) {
      setError("Invalid email format");
      return;
    }
    setSaving(true);
    const prev = { ...lead };
    onSave(local); // optimistic update
    try {
      await simulateSave(local);
      setSaving(false);
      onClose();
      showToast("Contact updated successfully!");
    } catch (e: any) {
      onSave(prev); // rollback
      setSaving(false);
      setError(e.message || "Failed to save");
    }
  };

  const handleConvert = async () => {
    if (!local) return;
    const opp: Opportunity = {
      id: crypto.randomUUID(),
      name: local.name,
      stage: "Prospecting",
      amount: undefined,
      accountName: local.company,
    };
    onConvert(opp);
    try {
      await simulateSave(opp, 0.1);
      onClose();
      showToast("Lead converted into opportunity!");
    } catch (e: any) {
      setError(e.message || "Failed to convert");
    }
  };

  useEffect(() => {
    if (lead) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [lead]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
    >
      {/* overlay */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={isOpen ? onClose : undefined}
        aria-hidden={!isOpen}
      />

      {/* painel lateral */}
      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl
                    flex flex-col
                    transform transition-transform duration-300 ease-out
                    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        {lead && local && (
          <>
            {/* conteúdo rolável */}
            <div className="flex-1 overflow-y-auto p-4 pr-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Lead Detail</h2>
                <button
                  onClick={onClose}
                  className="rounded-md px-2 py-1 hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-sm text-gray-600">Name</label>
                  <div className="font-medium">{local.name}</div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Company</label>
                  <div className="font-medium">{local.company}</div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Email</label>
                  <Input
                    type="email"
                    value={local.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Status</label>
                  <Select
                    value={local.status}
                    onValueChange={(v) => update("status", v)}
                  >
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Contacted">Contacted</SelectItem>
                      <SelectItem value="Qualified">Qualified</SelectItem>
                      <SelectItem value="Unqualified">Unqualified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {error && <div className="text-sm text-red-600">{error}</div>}
              </div>
            </div>

            {/* footer fixo */}
            <div className="shrink-0 border-t bg-white p-4">
              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </Button>
                <Button onClick={onClose} variant="outline">
                  Cancel
                </Button>
                <Button
                  onClick={handleConvert}
                  className="ml-auto bg-emerald-600 hover:bg-emerald-700"
                >
                  Convert Lead
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
