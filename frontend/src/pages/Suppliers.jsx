// src/pages/Suppliers.jsx
import React, { useState, useEffect } from "react";
import {
  fetchSuppliers,
  createSupplier,
  deleteSupplier,
} from "../services/supplierService";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    cnpj: "",
    address: "",
    phone: "",
    contact_person: "",
    status: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSuppliers();
  }, []);

  async function loadSuppliers() {
    try {
      setLoading(true);
      const data = await fetchSuppliers();
      setSuppliers(data);
    } catch {
      setError("Falha ao carregar fornecedores");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newSupplier = await createSupplier(form);
      setSuppliers([newSupplier, ...suppliers]);
      setForm({
        name: "",
        cnpj: "",
        address: "",
        phone: "",
        contact_person: "",
        status: true,
      });
    } catch {
      setError("Erro ao criar fornecedor");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Deseja realmente excluir este fornecedor?")) return;
    try {
      await deleteSupplier(id);
      setSuppliers(suppliers.filter((s) => s.id !== id));
    } catch {
      setError("Erro ao excluir fornecedor");
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Fornecedores</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Formulário de criação */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {["name", "cnpj", "address", "phone", "contact_person"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize">
              {field.replace("_", " ")}
            </label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              required={field === "name"}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
        ))}
        <div className="flex items-center space-x-2">
          <input
            id="status"
            name="status"
            type="checkbox"
            checked={form.status}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <label htmlFor="status" className="text-sm">
            Ativo
          </label>
        </div>
        <button
          type="submit"
          className="col-span-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Criar Fornecedor
        </button>
      </form>

      {/* Lista de fornecedores */}
      {loading ? (
        <p>Carregando fornecedores...</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">CNPJ</th>
              <th className="p-2 border">Contato</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="p-2 border">{s.id}</td>
                <td className="p-2 border">{s.name}</td>
                <td className="p-2 border">{s.cnpj || "-"}</td>
                <td className="p-2 border">{s.contact_person || "-"}</td>
                <td className="p-2 border">
                  {s.status ? "Ativo" : "Inativo"}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(s.id)}
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
