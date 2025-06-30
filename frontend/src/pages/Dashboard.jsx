
import React, { useState, useEffect } from "react";
import { 
  Users, ClipboardList, Truck, Box, Award, Link as LinkIcon, 
  CheckSquare, Phone, TrendingUp, AlertTriangle, Calendar, Activity
} from "lucide-react";
import { fetchDashboardCounts } from "../services/reportService";

export default function Dashboard() {
  const [counts, setCounts] = useState({
    clients: 0,
    analysts: 0,
    suppliers: 0,
    equipment: 0,
    certifications: 0,
    links: 0,
    tasks: 0,
    contacts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      const data = await fetchDashboardCounts();
      setCounts(data);
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  const cards = [
    { title: "Clientes", value: counts.clients, icon: Users, color: "bg-blue-500", trend: "+12%" },
    { title: "Analistas", value: counts.analysts, icon: ClipboardList, color: "bg-green-500", trend: "+2%" },
    { title: "Fornecedores", value: counts.suppliers, icon: Truck, color: "bg-purple-500", trend: "+5%" },
    { title: "Equipamentos", value: counts.equipment, icon: Box, color: "bg-orange-500", trend: "+8%" },
    { title: "Certificações", value: counts.certifications, icon: Award, color: "bg-yellow-500", trend: "0%" },
    { title: "Links", value: counts.links, icon: LinkIcon, color: "bg-indigo-500", trend: "+15%" },
    { title: "Tarefas", value: counts.tasks, icon: CheckSquare, color: "bg-red-500", trend: "-3%" },
    { title: "Contatos", value: counts.contacts, icon: Phone, color: "bg-teal-500", trend: "+7%" },
  ];

  const alerts = [
    { type: "warning", message: "5 certificações vencem em 30 dias", time: "2h atrás" },
    { type: "error", message: "3 contratos precisam de renovação", time: "1 dia atrás" },
    { type: "info", message: "12 visitas agendadas para esta semana", time: "3h atrás" },
    { type: "warning", message: "2 equipamentos offline", time: "5h atrás" },
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case "error": return "🔴";
      case "warning": return "🟡";
      default: return "🔵";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral das operações da OL Tecnologia</p>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">{card.trend}</span>
                  <span className="text-sm text-gray-500 ml-2">vs mês anterior</span>
                </div>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Desempenho Mensal</h3>
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">Últimos 6 meses</span>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Gráfico de desempenho</p>
              <p className="text-sm text-gray-400">Em desenvolvimento</p>
            </div>
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Alertas Recentes</h3>
            <AlertTriangle className="w-5 h-5 text-orange-500" />
          </div>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-lg">{getAlertIcon(alert.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
            Ver todos os alertas
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Users className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-blue-900">Novo Cliente</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <CheckSquare className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-green-900">Nova Tarefa</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <Box className="w-8 h-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-orange-900">Equipamento</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <Phone className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-900">Contato</span>
          </button>
        </div>
      </div>
    </div>
  );
}
