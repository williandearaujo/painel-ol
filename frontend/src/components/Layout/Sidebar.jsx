import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  ClipboardList, 
  Building2, 
  Monitor, 
  Award, 
  Link, 
  Contact, 
  BarChart3, 
  BellOff,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(location.pathname === '/');

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/clients', icon: Building2, label: 'Clientes' },
    { path: '/analysts', icon: UserCheck, label: 'Analistas' },
    { path: '/tasks', icon: ClipboardList, label: 'Tarefas' },
    { path: '/suppliers', icon: Users, label: 'Fornecedores' },
    { path: '/equipment', icon: Monitor, label: 'Equipamentos' },
    { path: '/certifications', icon: Award, label: 'Certificações' },
    { path: '/links', icon: Link, label: 'Links' },
    { path: '/contacts', icon: Contact, label: 'Contatos' },
    { path: '/reports', icon: BarChart3, label: 'Relatórios' },
    { path: '/alerts', icon: BellOff, label: 'Alertas' },
  ];

  return (
    <aside 
      className={`bg-white shadow-soft border-r border-slate-200/60 transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-20'
      } flex flex-col relative`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-8 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-soft hover:shadow-medium transition-all duration-200 z-10"
      >
        {isExpanded ? (
          <ChevronLeft className="w-4 h-4 text-slate-600" />
        ) : (
          <ChevronRight className="w-4 h-4 text-slate-600" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-primary-50 text-primary-700 shadow-soft border border-primary-200'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`flex-shrink-0 w-5 h-5 ${isActive ? 'text-primary-600' : ''}`} />
              {isExpanded && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {!isExpanded && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Info */}
      {isExpanded && (
        <div className="px-4 py-4 border-t border-slate-200/60">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-medium text-slate-900 mb-1">OL Tecnologia</p>
            <p className="text-xs text-slate-500">Versão 1.0.0</p>
          </div>
        </div>
      )}
    </aside>
  );
}