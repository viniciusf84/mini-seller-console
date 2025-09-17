import { useEffect, useState } from "react";
import LeadList from "@components/LeadList";
import LeadDetailPanel from "@components/LeadDetailPanel";
import OpportunitiesTable from "@components/OpportunitiesTable";
import Toast from "@components/ui/toast";
import type { Lead, Opportunity } from "./types";
import GoToTop from "@components/ui/go-to-top";
import leadsData from "../data/leads.json"; // renomeei para evitar conflito de nome

export default function App() {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [opps, setOpps] = useState<Opportunity[]>([]);
  const [lastOppId, setLastOppId] = useState<string | null>(null);

  useEffect(() => {
    try {
      // simula um loading delay
      setTimeout(() => {
        setLeads(leadsData as Lead[]);
      }, 600);
    } catch (e: any) {
      setError(e.message || "Error loading leads");
    }
  }, []);

  const replaceLead = (updated: Lead) => {
    setLeads((prev) =>
      prev ? prev.map((l) => (l.id === updated.id ? updated : l)) : prev
    );
    setSelected(updated);
  };

  const showToast = (msg: string) => {
    setToast({ visible: true, message: msg });
  };

  return (
    <div className="mx-auto max-w-6xl p-4">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
          Mini Seller Console
        </h1>
      </header>

      {!leads && !error && (
        <div className="rounded-lg border bg-white p-6 text-center text-gray-600">
          Loading leads…
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
          {error}
        </div>
      )}

      {leads && leads.length === 0 && (
        <div className="rounded-lg border bg-white p-6 text-center text-gray-600">
          No leads available.
        </div>
      )}

      {leads && leads.length > 0 && (
        <>
          <LeadList leads={leads} onSelect={setSelected} />
          <OpportunitiesTable opportunities={opps} highlightId={lastOppId} />
        </>
      )}

      <LeadDetailPanel
        lead={selected}
        onClose={() => setSelected(null)}
        onSave={replaceLead}
        onConvert={(o) => {
          setOpps((prev) => [o, ...prev]);
          setLastOppId(o.id);
        }}
        showToast={showToast}
      />

      <Toast
        message={toast.message}
        visible={toast.visible}
        onClose={() => setToast({ ...toast, visible: false })}
      />

      <GoToTop />
    </div>
  );
}
