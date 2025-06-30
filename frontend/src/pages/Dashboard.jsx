
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  UserCheck, 
  ClipboardList, 
  Building2, 
  Monitor, 
  Award, 
  Link2, 
  TrendingUp,
  Bell,
  AlertTriangle,
  Calendar,
  Activity,
  BarChart3,
  PieChart,
  Target
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    clients: 45,
    analysts: 12,
    suppliers: 23,
    tasks: 156,
    equipment: 89,
    certifications: 34,
    links: 67
  });

  const [alerts] = useState([
    {
      id: 1,
      type: 'warning',
      message: '3 certificações vencem em 30 dias',
      icon: AlertTriangle
    },
    {
      id: 2,
      type: 'info',
      message: '15 tarefas pendentes esta semana',
      icon: ClipboardList
    },
    {
      id: 3,
      type: 'danger',
      message: '2 equipamentos offline',
      icon: Monitor
    }
  ]);

  const StatCard = ({ title, value, icon: Icon, color, trend, description }) => (
    <div className="ios-card p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`p-3 rounded-2xl ${color} shadow-sm`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
            </div>
          </div>
          
          {trend && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp className="h-3 w-3 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700">+{trend}%</span>
              </div>
              <span className="text-xs text-gray-500">vs mês anterior</span>
            </div>
          )}
          
          {description && (
            <p className="text-xs text-gray-500 mt-2">{description}</p>
          )}
        </div>
      </div>
    </div>
  );

  const AlertCard = ({ alert }) => {
    const { icon: Icon } = alert;
    const colorMap = {
      warning: {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        text: 'text-amber-800',
        icon: 'text-amber-600'
      },
      danger: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-800',
        icon: 'text-red-600'
      },
      info: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-800',
        icon: 'text-blue-600'
      }
    };

    const colors = colorMap[alert.type];

    return (
      <div className={`${colors.bg} ${colors.border} ${colors.text} border rounded-xl p-4 flex items-center space-x-3 animate-slide-in-right`}>
        <Icon className={`h-5 w-5 ${colors.icon}`} />
        <span className="font-medium text-sm">{alert.message}</span>
      </div>
    );
  };

  const QuickAction = ({ icon: Icon, label, color }) => (
    <button className={`ios-card p-4 flex flex-col items-center space-y-2 hover:shadow-lg transition-all duration-300 group`}>
      <div className={`p-3 rounded-2xl ${color} group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bem-vindo, {user?.email?.split('@')[0] || 'Admin'}! 👋
            </h1>
            <p className="text-gray-600 font-medium">
              Aqui está um resumo das suas atividades hoje.
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm border">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {new Date().toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-gray-600" />
              <h2 className="font-semibold text-gray-900">Alertas Importantes</h2>
            </div>
            <div className="grid gap-3">
              {alerts.map((alert, index) => (
                <div key={alert.id} style={{animationDelay: `${index * 0.1}s`}}>
                  <AlertCard alert={alert} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div style={{animationDelay: '0.1s'}}>
            <StatCard
              title="Clientes"
              value={stats.clients}
              icon={Building2}
              color="bg-gradient-to-br from-blue-500 to-blue-600"
              trend={12}
              description="Clientes ativos no sistema"
            />
          </div>
          
          <div style={{animationDelay: '0.2s'}}>
            <StatCard
              title="Analistas"
              value={stats.analysts}
              icon={UserCheck}
              color="bg-gradient-to-br from-emerald-500 to-emerald-600"
              trend={8}
              description="Profissionais em atividade"
            />
          </div>
          
          <div style={{animationDelay: '0.3s'}}>
            <StatCard
              title="Tarefas"
              value={stats.tasks}
              icon={ClipboardList}
              color="bg-gradient-to-br from-purple-500 to-purple-600"
              description="Tarefas gerenciadas"
            />
          </div>
          
          <div style={{animationDelay: '0.4s'}}>
            <StatCard
              title="Fornecedores"
              value={stats.suppliers}
              icon={Users}
              color="bg-gradient-to-br from-orange-500 to-orange-600"
              trend={5}
              description="Parceiros cadastrados"
            />
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div style={{animationDelay: '0.5s'}}>
            <StatCard
              title="Equipamentos"
              value={stats.equipment}
              icon={Monitor}
              color="bg-gradient-to-br from-cyan-500 to-cyan-600"
              description="Dispositivos monitorados"
            />
          </div>
          
          <div style={{animationDelay: '0.6s'}}>
            <StatCard
              title="Certificações"
              value={stats.certifications}
              icon={Award}
              color="bg-gradient-to-br from-rose-500 to-rose-600"
              description="Certificados válidos"
            />
          </div>
          
          <div style={{animationDelay: '0.7s'}}>
            <StatCard
              title="Links Úteis"
              value={stats.links}
              icon={Link2}
              color="bg-gradient-to-br from-indigo-500 to-indigo-600"
              description="Recursos disponíveis"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <Target className="h-6 w-6 text-gray-600" />
            <span>Ações Rápidas</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <QuickAction
              icon={Building2}
              label="Novo Cliente"
              color="bg-gradient-to-br from-blue-500 to-blue-600"
            />
            <QuickAction
              icon={UserCheck}
              label="Cadastrar Analista"
              color="bg-gradient-to-br from-emerald-500 to-emerald-600"
            />
            <QuickAction
              icon={ClipboardList}
              label="Nova Tarefa"
              color="bg-gradient-to-br from-purple-500 to-purple-600"
            />
            <QuickAction
              icon={Monitor}
              label="Adicionar Equipamento"
              color="bg-gradient-to-br from-cyan-500 to-cyan-600"
            />
            <QuickAction
              icon={BarChart3}
              label="Ver Relatórios"
              color="bg-gradient-to-br from-amber-500 to-amber-600"
            />
            <QuickAction
              icon={Activity}
              label="Monitoramento"
              color="bg-gradient-to-br from-red-500 to-red-600"
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="ios-card p-6 text-center animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Activity className="h-4 w-4" />
            <span className="text-sm">Sistema funcionando perfeitamente</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Último backup: {new Date().toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  );
}
