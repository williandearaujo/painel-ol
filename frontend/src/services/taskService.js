// src/services/taskService.js
import API from "./api";

export async function fetchTasks() {
  const resp = await API.get("/tasks");
  return resp.data;
}

export async function createTask(task) {
  const resp = await API.post("/tasks", task);
  return resp.data;
}

export async function deleteTask(id) {
  await API.delete(`/tasks/${id}`);
}
