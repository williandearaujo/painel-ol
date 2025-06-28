// frontend/src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "./components/layout/PublicLayout";
import PrivateLayout from "./components/layout/PrivateLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Analysts from "./pages/Analysts";
import Tasks from "./pages/Tasks";
import Suppliers from "./pages/Suppliers";
import Equipment from "./pages/Equipment";
import Links from "./pages/Links";
import Certifications from "./pages/Certifications";
import Contacts from "./pages/Contacts";     // ← importe Contacts
import Reports from "./pages/Reports";       // ← importe Reports

import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Routes>
      {/* ROTAS PÚBLICAS */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* ROTAS PROTEGIDAS */}
      <Route
        element={
          <PrivateRoute>
            <PrivateLayout />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/analysts" element={<Analysts />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/links" element={<Links />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/contacts" element={<Contacts />} />       {/* ← adicione aqui */}
        <Route path="/reports" element={<Reports />} />         {/* ← e aqui */}
      </Route>

      {/* QUALQUER OUTRA ROTA VAI PARA LOGIN */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
