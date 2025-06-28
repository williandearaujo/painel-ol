// src/pages/Clients.jsx
import React, { useState, useEffect } from "react";
import {
  fetchClients,
  createClient,
  deleteClient,
} from "../services/clientService";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    cnpj: "",
    address: "",
    phone: "",
    account_manager: "",
    pre_sales: "",
    classification: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Carrega lista
  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    try {
      setLoading(true);
      const data = await fetchClients();
      setClients(data);
    } catch (e) {
      setError("Falha ao carregar clientes");
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
      const newClient = await createClient(form);
      setClients([newClient, ...clients]);
      setForm({
        name: "",
        cnpj: "",
        address: "",
        phone: "",
        account_manager: "",
        pre_sales: "",
        classification: "",
      });
    } catch (e) {
      setError("Erro ao criar cliente");
    }
  }

  // Exclui um cliente
  async function handleDelete(id) {
    if (!window.confirm("Deseja realmente excluir este cliente?")) return;
    try {
      await deleteClient(id);
      setClients(clients.filter((c) => c.id !== id));
    } catch {
      setError("Erro ao excluir cliente");
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Clientes</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Formulário de criação */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {["name", "cnpj", "address", "phone", "account_manager", "pre_sales", "classification"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize">
              {field.replace("_", " ")}
            </label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              required={field === "name" || field === "cnpj"}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
        ))}
        <button
          type="submit"
          className="col-span-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Criar Cliente
        </button>
      </form>

      {/* Lista de clientes */}
      {loading ? (
        <p>Carregando clientes...</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">CNPJ</th>
              <th className="p-2 border">Telefone</th>
              <th className="p-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="p-2 border">{c.id}</td>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.cnpj}</td>
                <td className="p-2 border">{c.phone || "-"}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(c.id)}
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
