// frontend/src/pages/Contacts.jsx
import React, { useState, useEffect } from "react";
import {
  fetchContacts,
  createContact,
  deleteContact,
} from "../services/contactService";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    classification: "client", // client, supplier, ol
    parentEntityId: "",       // clienteId ou fornecedorId ou null
    name: "",
    email: "",
    phone: "",
    role: "",
    escalation: false,
    escalationNumber: "",
    alternativePhone: "",
    status: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);
      setContacts(await fetchContacts());
    } catch {
      setError("Falha ao carregar contatos");
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
      const c = await createContact(form);
      setContacts([c, ...contacts]);
      setForm({
        classification: "client",
        parentEntityId: "",
        name: "",
        email: "",
        phone: "",
        role: "",
        escalation: false,
        escalationNumber: "",
        alternativePhone: "",
        status: true,
      });
    } catch {
      setError("Erro ao criar contato");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Excluir contato?")) return;
    try {
      await deleteContact(id);
      setContacts(contacts.filter((c) => c.id !== id));
    } catch {
      setError("Erro ao excluir contato");
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Contatos</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block text-sm font-medium">Classificação</label>
          <select
            name="classification"
            value={form.classification}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          >
            <option value="client">Cliente</option>
            <option value="supplier">Fornecedor</option>
            <option value="ol">OL</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">
            Entidade Relacionada (ID)
          </label>
          <input
            name="parentEntityId"
            type="number"
            value={form.parentEntityId}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          />
        </div>
        {["name","email","phone","role"].map((f) => (
          <div key={f}>
            <label className="block text-sm font-medium">{f.charAt(0).toUpperCase()+f.slice(1)}</label>
            <input
              name={f}
              value={form[f]}
              onChange={handleChange}
              required={f==="name"}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
        ))}
        <div className="flex items-center space-x-2">
          <input
            id="escalation"
            name="escalation"
            type="checkbox"
            checked={form.escalation}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <label htmlFor="escalation" className="text-sm">Escalonamento</label>
        </div>
        {form.escalation && (
          <div>
            <label className="block text-sm font-medium">N° Escalação</label>
            <input
              name="escalationNumber"
              value={form.escalationNumber}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium">Telefone Alt.</label>
          <input
            name="alternativePhone"
            value={form.alternativePhone}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            id="status"
            name="status"
            type="checkbox"
            checked={form.status}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <label htmlFor="status" className="text-sm">Ativo</label>
        </div>
        <button
          type="submit"
          className="col-span-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Criar Contato
        </button>
      </form>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Classif.</th>
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Telefone</th>
              <th className="p-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="p-2 border">{c.id}</td>
                <td className="p-2 border">{c.classification}</td>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.email}</td>
                <td className="p-2 border">{c.phone}</td>
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
