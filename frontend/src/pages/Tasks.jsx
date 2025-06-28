// src/pages/Tasks.jsx
import React, { useState, useEffect } from "react";
import {
  fetchTasks,
  createTask,
  deleteTask,
} from "../services/taskService";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    responsible: "",
    description: "",
    status: "Não iniciado",
    planned_completion: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch {
      setError("Falha ao carregar tarefas");
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
      const payload = {
        ...form,
        planned_completion: form.planned_completion
          ? new Date(form.planned_completion).toISOString()
          : null,
      };
      const newTask = await createTask(payload);
      setTasks([newTask, ...tasks]);
      setForm({
        responsible: "",
        description: "",
        status: "Não iniciado",
        planned_completion: "",
      });
    } catch {
      setError("Erro ao criar tarefa");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Deseja realmente excluir esta tarefa?")) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch {
      setError("Erro ao excluir tarefa");
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Tarefas</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Formulário de criação */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block text-sm font-medium">Responsável</label>
          <input
            name="responsible"
            value={form.responsible}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Descrição</label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          >
            <option>Não iniciado</option>
            <option>Em andamento</option>
            <option>Cancelado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Previsão</label>
          <input
            name="planned_completion"
            type="date"
            value={form.planned_completion}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="col-span-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Criar Tarefa
        </button>
      </form>

      {/* Lista de tarefas */}
      {loading ? (
        <p>Carregando tarefas...</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Responsável</th>
              <th className="p-2 border">Descrição</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Previsão</th>
              <th className="p-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="p-2 border">{t.id}</td>
                <td className="p-2 border">{t.responsible}</td>
                <td className="p-2 border">{t.description}</td>
                <td className="p-2 border">{t.status}</td>
                <td className="p-2 border">
                  {t.planned_completion
                    ? new Date(t.planned_completion).toLocaleDateString()
                    : "-"}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(t.id)}
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
