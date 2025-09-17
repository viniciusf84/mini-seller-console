import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Lead } from "../types";
import { useLocalStorage } from "@hooks/useLocalStorage";

type Props = {
  leads: Lead[];
  onSelect: (lead: Lead) => void;
};

export default function LeadList({ leads, onSelect }: Props) {
  const [search, setSearch] = useLocalStorage<string>("msc:search", "");
  const [statusFilter, setStatusFilter] = useLocalStorage<string>(
    "msc:status",
    "All"
  );
  const [sortKey, setSortKey] = useLocalStorage<"scoreDesc" | "scoreAsc">(
    "msc:sort",
    "scoreDesc"
  );

  const statusColors: Record<string, string> = {
    New: "bg-blue-100 text-blue-800",
    Contacted: "bg-yellow-100 text-yellow-800",
    Qualified: "bg-green-100 text-green-800",
    Unqualified: "bg-red-100 text-red-800",
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let list = leads.filter(
      (l) =>
        (!q ||
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q)) &&
        (statusFilter === "All" || l.status === statusFilter)
    );
    list.sort((a, b) =>
      sortKey === "scoreDesc" ? b.score - a.score : a.score - b.score
    );
    return list;
  }, [leads, search, statusFilter, sortKey]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name/company"
          className="w-full md:max-w-sm rounded-lg border border-gray-300 px-3 py-2"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All status</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Contacted">Contacted</SelectItem>
            <SelectItem value="Qualified">Qualified</SelectItem>
            <SelectItem value="Unqualified">Unqualified</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortKey} onValueChange={(v) => setSortKey(v as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="scoreDesc">Score ↓</SelectItem>
            <SelectItem value="scoreAsc">Score ↑</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Company</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Source</th>
              <th className="px-3 py-2">Score</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-gray-500">
                  No leads found.
                </td>
              </tr>
            ) : (
              filtered.map((l) => (
                <tr
                  key={l.id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => onSelect(l)}
                >
                  <td className="px-3 py-2">{l.name}</td>
                  <td className="px-3 py-2">{l.company}</td>
                  <td className="px-3 py-2">{l.email}</td>
                  <td className="px-3 py-2">{l.source}</td>
                  <td className="px-3 py-2 font-medium">{l.score}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        statusColors[l.status] ?? "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
