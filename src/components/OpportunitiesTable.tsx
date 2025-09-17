import { useEffect, useRef } from "react";
import { Opportunity } from "../types";

type Props = {
  opportunities: Opportunity[];
  highlightId?: string | null; // id da última oportunidade adicionada
};

export default function OpportunitiesTable({
  opportunities,
  highlightId,
}: Props) {
  const lastRef = useRef<HTMLTableRowElement | null>(null);

  useEffect(() => {
    if (lastRef.current) {
      lastRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightId]);

  return (
    <div className="mt-6">
      <h3 className="text-base font-semibold mb-2">Opportunities</h3>
      <div className="overflow-auto rounded-lg border border-gray-200 bg-white max-h-[400px]">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Stage</th>
              <th className="px-3 py-2">Account</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-3 py-6 text-center text-gray-500">
                  No opportunities yet.
                </td>
              </tr>
            ) : (
              opportunities.map((o, idx) => (
                <tr
                  key={o.id}
                  ref={highlightId === o.id ? lastRef : null} // marca o último adicionado
                  className={`border-t ${
                    highlightId === o.id ? "bg-emerald-50" : ""
                  }`}
                >
                  <td className="px-3 py-2">{o.name}</td>
                  <td className="px-3 py-2">{o.stage}</td>
                  <td className="px-3 py-2">{o.accountName}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
