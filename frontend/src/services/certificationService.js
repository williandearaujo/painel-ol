// frontend/src/services/certificationService.js
import API from "./api";

export async function fetchCertifications() {
  const resp = await API.get("/certifications");
  return resp.data;
}

export async function createCertification(cert) {
  const resp = await API.post("/certifications", cert);
  return resp.data;
}

export async function deleteCertification(id) {
  await API.delete(`/certifications/${id}`);
}
