import api from "./api"

export const equipmentService = {
  getAll: () => api.get("/equipment").then(res => res.data),
  getById: (id) => api.get(`/equipment/${id}`).then(res => res.data),
  create: (data) => api.post("/equipment", data).then(res => res.data),
  update: (id, data) => api.put(`/equipment/${id}`, data).then(res => res.data),
  remove: (id) => api.delete(`/equipment/${id}`)
}
