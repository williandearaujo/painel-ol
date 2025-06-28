// src/services/analystService.js
import API from "./api";

export async function fetchAnalysts() {
  const resp = await API.get("/analysts");
  return resp.data;
}

export async function createAnalyst(analyst) {
  const resp = await API.post("/analysts", analyst);
  return resp.data;
}

export async function deleteAnalyst(id) {
  await API.delete(`/analysts/${id}`);
}
