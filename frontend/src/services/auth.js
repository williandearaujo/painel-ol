import api from "./api"

export const authService = {
  login: async (email, password) => {
    const params = new URLSearchParams()
    params.append("username", email)
    params.append("password", password)
    const response = await api.post("/token", params)
    return response.data
  },

  me: async () => {
    const response = await api.get("/users/me")
    return response.data
  },
}

export const getToken = () => {
  return localStorage.getItem("token")
}
