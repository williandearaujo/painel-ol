// src/services/supplierService.js
import API from "./api";

export async function fetchSuppliers() {
  const resp = await API.get("/suppliers");
  return resp.data;
}

export async function createSupplier(supplier) {
  const resp = await API.post("/suppliers", supplier);
  return resp.data;
}

export async function deleteSupplier(id) {
  await API.delete(`/suppliers/${id}`);
}
