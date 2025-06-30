
import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  UserCheck, 
  Users, 
  ClipboardList, 
  Monitor, 
  Award, 
  TrendingUp, 
  AlertTriangle,
  Calendar,
  Activity
} from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    clients: 0,
    analysts: 0,
    suppliers: 0,
    tasks: 0,
    equipment: 0,
    certifications: 0
  });

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'Contrato da Empresa ABC vence em 5 dias', time: '2h atrás' },
    { id: 2, type: 'info', message: 'Nova certificação AWS disponível', time: '4h atrás' },
    { id: 3, type: 'error', message: 'Equipamento servidor-01 com problema', time: '6h atrás' }
  ]);

  useEffect(() => {
    // Simular carregamento de dados
    const fetchDashboardData = async () => {
      // Aqui você faria as chamadas reais para a API
      setStats({
        clients: 45,
        analysts: 12,
        suppliers: 8,
        tasks: 23,
        equipment: 67,
        certifications: 15
      });
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Clientes',
      value: stats.clients,
      icon: Building2,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Analistas',
      value: stats.analysts,
      icon: UserCheck,
      color: 'from-emerald-500 to-emerald-600',
      change: '+3%',
      trend: 'up'
    },
    {
      title: 'Fornecedores',
      value: stats.suppliers,
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      change: '+5%',
      trend: 'up'
    },
    {
      title: 'Tarefas Ativas',
      value: stats.tasks,
      icon: ClipboardList,
      color: 'from-amber-500 to-amber-600',
      change: '-8%',
      trend: 'down'
    },
    {
      title: 'Equipamentos',
      value: stats.equipment,
      icon: Monitor,
      color: 'from-cyan-500 to-cyan-600',
      change: '+15%',
      trend: 'up'
    },
    {
      title: 'Certificações',
      value: stats.certifications,
      icon: Award,
      color: 'from-rose-500 to-rose-600',
      change: '+7%',
      trend: 'up'
    }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  const getAlertStyle = (type) => {
    switch (type) {
      case 'warning':
        return 'border-l-amber-400 bg-amber-50';
      case 'error':
        return 'border-l-red-400 bg-red-50';
      default:
        return 'border-l-blue-400 bg-blue-50';
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Visão geral do sistema</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Calendar className="w-4 h-4" />
            <span>Última atualização: {new Date().toLocaleString('pt-BR')}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="stats-card">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`stats-card-icon bg-gradient-to-br ${card.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="stats-card-value">{card.value}</div>
                  <div className="stats-card-label">{card.title}</div>
                </div>
                <div className="text-right">
                  <div className={`flex items-center space-x-1 text-sm font-medium ${
                    card.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${card.trend === 'down' ? 'rotate-180' : ''}`} />
                    <span>{card.change}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">vs. mês anterior</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alerts Panel */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span>Alertas Recentes</span>
              </h2>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`border-l-4 p-4 rounded-r-lg ${getAlertStyle(alert.type)}`}
                  >
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{alert.message}</p>
                        <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold text-slate-900">Ações Rápidas</h2>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <button className="w-full btn-primary text-left">
                  <Building2 className="w-4 h-4 inline mr-2" />
                  Novo Cliente
                </button>
                <button className="w-full btn-secondary text-left">
                  <ClipboardList className="w-4 h-4 inline mr-2" />
                  Nova Tarefa
                </button>
                <button className="w-full btn-secondary text-left">
                  <Monitor className="w-4 h-4 inline mr-2" />
                  Cadastrar Equipamento
                </button>
                <button className="w-full btn-secondary text-left">
                  <Award className="w-4 h-4 inline mr-2" />
                  Adicionar Certificação
                </button>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="card mt-6">
            <div className="card-header">
              <h2 className="text-lg font-semibold text-slate-900">Status do Sistema</h2>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">API Backend</span>
                  <span className="badge badge-success">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Banco de Dados</span>
                  <span className="badge badge-success">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Backup</span>
                  <span className="badge badge-info">Em andamento</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
