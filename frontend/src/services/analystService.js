import api from "./api"

export const analystService = {
  getAll: () => api.get("/analysts").then(res => res.data),
  getById: (id) => api.get(`/analysts/${id}`).then(res => res.data),
  create: (data) => api.post("/analysts", data).then(res => res.data),
  update: (id, data) => api.put(`/analysts/${id}`, data).then(res => res.data),
  remove: (id) => api.delete(`/analysts/${id}`).then(res => res.data),
}
