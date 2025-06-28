// src/services/clientService.js
import API from "./api";

export async function fetchClients() {
  const resp = await API.get("/clients");
  return resp.data;
}

export async function createClient(client) {
  const resp = await API.post("/clients", client);
  return resp.data;
}

export async function deleteClient(id) {
  await API.delete(`/clients/${id}`);
}
