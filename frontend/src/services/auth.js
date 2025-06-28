// src/services/auth.js
import API from "./api";

const TOKEN_KEY = "access_token";

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function login(email, password) {
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);
  const resp = await API.post("/token", params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return resp.data.access_token;
}

export function isLoggedIn() {
  return Boolean(getToken());
}

// Injetar automaticamente o header Authorization
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
