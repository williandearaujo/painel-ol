// src/pages/Analysts.jsx
import React, { useState, useEffect } from "react";
import {
  fetchAnalysts,
  createAnalyst,
  deleteAnalyst,
} from "../services/analystService";

export default function Analysts() {
  const [analysts, setAnalysts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    entry_date: "",
    rg: "",
    cpf: "",
    phone_personal: "",
    phone_work: "",
    spouse: "",
    children: "",
    gender: "",
    position: "",
    seniority: "",
    salary: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Carrega lista
  useEffect(() => {
    loadAnalysts();
  }, []);

  async function loadAnalysts() {
    try {
      setLoading(true);
      const data = await fetchAnalysts();
      setAnalysts(data);
    } catch {
      setError("Falha ao carregar analistas");
    } finally {
      setLoading(false);
    }
  }

  // Manipula input
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Submete criação
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // converter entry_date para ISO
      const payload = { ...form, entry_date: new Date(form.entry_date).toISOString() };
      const newAnalyst = await createAnalyst(payload);
      setAnalysts([newAnalyst, ...analysts]);
      setForm({
        name: "",
        entry_date: "",
        rg: "",
        cpf: "",
        phone_personal: "",
        phone_work: "",
        spouse: "",
        children: "",
        gender: "",
        position: "",
        seniority: "",
        salary: "",
      });
    } catch {
      setError("Erro ao criar analista");
    }
  }

  // Exclui
  async function handleDelete(id) {
    if (!window.confirm("Deseja realmente excluir este analista?")) return;
    try {
      await deleteAnalyst(id);
      setAnalysts(analysts.filter((a) => a.id !== id));
    } catch {
      setError("Erro ao excluir analista");
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Analistas</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Formulário de criação */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Campos básicos obrigatórios */}
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Data de Entrada</label>
          <input
            name="entry_date"
            type="date"
            value={form.entry_date}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </div>

        {/* Campos opcionais */}
        {["rg", "cpf", "phone_personal", "phone_work", "spouse", "children", "gender", "position", "seniority", "salary"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize">
              {field.replace("_", " ")}
            </label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
        ))}

        <button
          type="submit"
          className="col-span-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Criar Analista
        </button>
      </form>

      {/* Lista de analistas */}
      {loading ? (
        <p>Carregando analistas...</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">Entrada</th>
              <th className="p-2 border">CPF</th>
              <th className="p-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {analysts.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="p-2 border">{a.id}</td>
                <td className="p-2 border">{a.name}</td>
                <td className="p-2 border">
                  {new Date(a.entry_date).toLocaleDateString()}
                </td>
                <td className="p-2 border">{a.cpf || "-"}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
