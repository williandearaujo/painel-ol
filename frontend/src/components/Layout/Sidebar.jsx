
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home, Users, ClipboardList, CheckSquare, Truck, Box,
  Link as LinkIcon, Phone, FileText, BarChart2, Bell, Award,
  ChevronLeft, ChevronRight
} from "lucide-react";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  // Auto-expand on dashboard, allow manual toggle on other pages
  const shouldExpand = isDashboard || isExpanded;

  const linkClass = ({ isActive }) =>
    `flex items-center p-3 mx-2 rounded-lg transition-all duration-200 ${
      isActive 
        ? "bg-blue-600 text-white shadow-md" 
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
    } ${!shouldExpand ? "justify-center" : ""}`;

  const menuItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/clients", icon: Users, label: "Clientes" },
    { path: "/analysts", icon: ClipboardList, label: "Analistas" },
    { path: "/tasks", icon: CheckSquare, label: "Tarefas" },
    { path: "/suppliers", icon: Truck, label: "Fornecedores" },
    { path: "/equipment", icon: Box, label: "Equipamentos" },
    { path: "/certifications", icon: Award, label: "Certificações" },
    { path: "/links", icon: LinkIcon, label: "Links" },
    { path: "/contacts", icon: Phone, label: "Contatos" },
    { path: "/reports", icon: BarChart2, label: "Relatórios" },
  ];

  const comingSoonItems = [
    { icon: FileText, label: "Chamados" },
    { icon: FileText, label: "Projetos" },
  ];

  return (
    <aside 
      className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        shouldExpanded ? "w-64" : "w-16"
      }`}
      onMouseEnter={() => !isDashboard && setIsExpanded(true)}
      onMouseLeave={() => !isDashboard && setIsExpanded(false)}
    >
      {/* Toggle Button (only visible when not on dashboard) */}
      {!isDashboard && (
        <div className="flex justify-end p-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            {shouldExpand ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass}>
              <item.icon className={`w-5 h-5 ${shouldExpand ? "mr-3" : ""}`} />
              {shouldExpand && (
                <span className="font-medium">{item.label}</span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Coming Soon Section */}
        {shouldExpand && (
          <div className="mt-8 px-4">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Em breve
            </div>
            <div className="space-y-1">
              {comingSoonItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 mx-2 text-gray-400 cursor-not-allowed opacity-50"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Alerts Section */}
      <div className="border-t border-gray-200 p-4">
        <button
          className={`flex items-center w-full p-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition-colors ${
            !shouldExpand ? "justify-center" : ""
          }`}
        >
          <div className="relative">
            <Bell className={`w-5 h-5 ${shouldExpand ? "mr-3" : ""}`} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              5
            </span>
          </div>
          {shouldExpand && <span className="font-medium">Alertas</span>}
        </button>
      </div>
    </aside>
  );
}
