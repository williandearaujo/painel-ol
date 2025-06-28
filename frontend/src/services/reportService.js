// src/services/reportService.js
import API from "./api";

export async function fetchDashboardCounts() {
  const resp = await API.get("/reports/counts");
  return resp.data;
}
