// frontend/src/components/layout/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home, Users, ClipboardList, CheckSquare, Truck, Box,
  Link as LinkIcon, Phone, FileText, BarChart2, BellOff, Award
} from "lucide-react";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center p-2 rounded hover:bg-gray-100 ${
      isActive ? "bg-gray-200" : ""
    }`;

  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      <nav className="flex-1 flex flex-col p-4 space-y-2">
        <NavLink to="/dashboard" className={linkClass}>
          <Home className="mr-2" /> Dashboard
        </NavLink>

        <NavLink to="/clients" className={linkClass}>
          <Users className="mr-2" /> Clientes
        </NavLink>

        <NavLink to="/analysts" className={linkClass}>
          <ClipboardList className="mr-2" /> Analistas
        </NavLink>

        <NavLink to="/tasks" className={linkClass}>
          <CheckSquare className="mr-2" /> Tarefas
        </NavLink>

        <NavLink to="/suppliers" className={linkClass}>
          <Truck className="mr-2" /> Fornecedores
        </NavLink>

        <NavLink to="/equipment" className={linkClass}>
          <Box className="mr-2" /> Equipamentos
        </NavLink>

        <NavLink to="/certifications" className={linkClass}>
          <Award className="mr-2" /> Certificações
        </NavLink>

        <NavLink to="/links" className={linkClass}>
          <LinkIcon className="mr-2" /> Links
        </NavLink>

        {/* Futuro: Chamados e Projetos */}
        <div className="pt-4 border-t border-gray-200 text-sm text-gray-400 uppercase px-2">
          Em breve
        </div>
        <div className="flex flex-col space-y-2 px-2">
          <button disabled className="flex items-center p-2 opacity-50 cursor-not-allowed">
            <FileText className="mr-2" /> Chamados
          </button>
          <button disabled className="flex items-center p-2 opacity-50 cursor-not-allowed">
            <FileText className="mr-2" /> Projetos
          </button>
        </div>

        {/* Contatos */}
        <NavLink to="/contacts" className={linkClass}>
          <Phone className="mr-2" /> Contatos
        </NavLink>

        {/* Relatórios */}
        <NavLink to="/reports" className={linkClass}>
          <BarChart2 className="mr-2" /> Relatórios
        </NavLink>
      </nav>

      {/* Alertas */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => {}}
          className="flex items-center w-full p-2 hover:bg-gray-100 rounded"
        >
          <BellOff className="mr-2" /> Alertas
        </button>
      </div>
    </aside>
  );
}
