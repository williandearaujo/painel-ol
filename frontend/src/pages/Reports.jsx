// frontend/src/pages/Reports.jsx
import React, { useState, useEffect } from "react";
import { fetchDashboardCounts } from "../services/reportService";

export default function Reports() {
  const [counts, setCounts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCounts();
  }, []);

  async function fetchCounts() {
    try {
      setCounts(await fetchDashboardCounts());
    } catch {
      setError("Falha ao carregar relatórios");
    }
  }

  if (error) return <p className="text-red-500">{error}</p>;
  if (!counts) return <p>Carregando relatórios...</p>;

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Relatórios</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(counts).map(([key, value]) => (
          <div
            key={key}
            className="p-4 bg-white rounded shadow flex flex-col items-center"
          >
            <span className="text-xl font-bold">{value}</span>
            <span className="capitalize">{key.replace("_", " ")}</span>
          </div>
        ))}
      </div>
    </div>
);
}
