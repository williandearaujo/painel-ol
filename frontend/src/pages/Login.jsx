// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      loginUser(token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("Credenciais inválidas");
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded shadow"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <label className="block mb-2">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </label>
        <label className="block mb-4">
          Senha
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
