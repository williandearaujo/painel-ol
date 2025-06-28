// frontend/src/pages/Certifications.jsx
import React, { useState, useEffect } from "react";
import {
  fetchCertifications,
  createCertification,
  deleteCertification,
} from "../services/certificationService";

export default function Certifications() {
  const [certs, setCerts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    link_schedule: "",
    link_blueprint: "",
    link_course: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCerts();
  }, []);

  async function loadCerts() {
    try {
      setLoading(true);
      const data = await fetchCertifications();
      setCerts(data);
    } catch {
      setError("Falha ao carregar certificações");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newCert = await createCertification(form);
      setCerts([newCert, ...certs]);
      setForm({
        name: "",
        link_schedule: "",
        link_blueprint: "",
        link_course: "",
      });
    } catch {
      setError("Erro ao criar certificação");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Deseja realmente excluir esta certificação?")) return;
    try {
      await deleteCertification(id);
      setCerts(certs.filter((c) => c.id !== id));
    } catch {
      setError("Erro ao excluir certificação");
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Certificações</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
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
          <label className="block text-sm font-medium">Link Agendamento</label>
          <input
            name="link_schedule"
            value={form.link_schedule}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Link Blueprint</label>
          <input
            name="link_blueprint"
            value={form.link_blueprint}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Link Curso</label>
          <input
            name="link_course"
            value={form.link_course}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="col-span-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Criar Certificação
        </button>
      </form>

      {loading ? (
        <p>Carregando certificações...</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">Agendamento</th>
              <th className="p-2 border">Blueprint</th>
              <th className="p-2 border">Curso</th>
              <th className="p-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {certs.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="p-2 border">{c.id}</td>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">
                  {c.link_schedule ? (
                    <a href={c.link_schedule} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      Agendar
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-2 border">
                  {c.link_blueprint ? (
                    <a href={c.link_blueprint} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      Blueprint
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-2 border">
                  {c.link_course ? (
                    <a href={c.link_course} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      Curso
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
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
