
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  Truck, 
  CheckSquare, 
  Monitor, 
  Award, 
  Link2, 
  Bell,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    clients: 0,
    analysts: 0,
    suppliers: 0,
    tasks: 0,
    equipment: 0,
    certifications: 0,
    links: 0
  });

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: '3 contratos vencem em 30 dias', icon: Calendar },
    { id: 2, type: 'danger', message: '2 certificações expiram esta semana', icon: Award },
    { id: 3, type: 'info', message: '5 visitas agendadas para hoje', icon: Users },
  ]);

  const [feedbackData] = useState([
    { month: 'Jan', positive: 85, improvement: 15 },
    { month: 'Fev', positive: 92, improvement: 8 },
    { month: 'Mar', positive: 88, improvement: 12 },
    { month: 'Abr', positive: 95, improvement: 5 },
    { month: 'Mai', positive: 91, improvement: 9 },
    { month: 'Jun', positive: 97, improvement: 3 },
  ]);

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setStats({
        clients: 47,
        analysts: 12,
        suppliers: 23,
        tasks: 156,
        equipment: 89,
        certifications: 34,
        links: 67
      });
    }, 1000);
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-slate-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
              <span className="text-sm text-emerald-600 font-medium">+{trend}%</span>
              <span className="text-xs text-slate-500 ml-1">vs mês anterior</span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-xl ${color}`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  );

  const AlertCard = ({ alert }) => {
    const { icon: Icon } = alert;
    const colorMap = {
      warning: 'bg-amber-50 border-amber-200 text-amber-800',
      danger: 'bg-red-50 border-red-200 text-red-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800'
    };

    return (
      <div className={`p-4 rounded-xl border ${colorMap[alert.type]} flex items-center space-x-3`}>
        <Icon className="h-5 w-5" />
        <span className="font-medium">{alert.message}</span>
      </div>
    );
  };

  const FeedbackChart = () => (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Feedbacks dos Clientes</h3>
        <Activity className="h-5 w-5 text-slate-400" />
      </div>
      <div className="space-y-4">
        {feedbackData.map((data, index) => (
          <div key={index} className="flex items-center space-x-4">
            <span className="text-sm font-medium text-slate-600 w-8">{data.month}</span>
            <div className="flex-1 flex space-x-2">
              <div 
                className="bg-emerald-500 rounded-full h-3 transition-all duration-500"
                style={{ width: `${data.positive}%` }}
              />
              <div 
                className="bg-amber-400 rounded-full h-3 transition-all duration-500"
                style={{ width: `${data.improvement}%` }}
              />
            </div>
            <span className="text-sm text-slate-600 w-12">{data.positive}%</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-emerald-500 rounded-full" />
          <span className="text-sm text-slate-600">Positivos</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-amber-400 rounded-full" />
          <span className="text-sm text-slate-600">Melhorias</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Visão geral do sistema OL Tecnologia</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary">
            <Calendar className="h-5 w-5 mr-2" />
            Hoje
          </button>
          <button className="btn-primary">
            <TrendingUp className="h-5 w-5 mr-2" />
            Relatórios
          </button>
        </div>
      </div>

      {/* Alertas */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-900">Alertas Importantes</h2>
          </div>
          <div className="grid gap-3">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      )}

      {/* Cards Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Clientes"
          value={stats.clients}
          icon={Building2}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          trend={12}
        />
        <StatCard
          title="Analistas Ativos"
          value={stats.analysts}
          icon={Users}
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
          trend={8}
        />
        <StatCard
          title="Fornecedores"
          value={stats.suppliers}
          icon={Truck}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          trend={5}
        />
        <StatCard
          title="Tarefas Ativas"
          value={stats.tasks}
          icon={CheckSquare}
          color="bg-gradient-to-br from-amber-500 to-amber-600"
          trend={15}
        />
      </div>

      {/* Cards Secundários */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Equipamentos"
          value={stats.equipment}
          icon={Monitor}
          color="bg-gradient-to-br from-cyan-500 to-cyan-600"
        />
        <StatCard
          title="Certificações"
          value={stats.certifications}
          icon={Award}
          color="bg-gradient-to-br from-rose-500 to-rose-600"
        />
        <StatCard
          title="Links Úteis"
          value={stats.links}
          icon={Link2}
          color="bg-gradient-to-br from-indigo-500 to-indigo-600"
        />
      </div>

      {/* Gráfico de Feedbacks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeedbackChart />
        
        {/* Atividades Recentes */}
        <div className="bg-white rounded-2xl p-6 shadow-soft border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Atividades Recentes</h3>
          <div className="space-y-4">
            {[
              { action: 'Novo cliente cadastrado', entity: 'Tech Solutions Ltda', time: '2 min atrás', type: 'client' },
              { action: 'Tarefa concluída', entity: 'Implementação do sistema', time: '15 min atrás', type: 'task' },
              { action: 'Equipamento atualizado', entity: 'Servidor Web-01', time: '1 hora atrás', type: 'equipment' },
              { action: 'Contrato renovado', entity: 'Empresa ABC', time: '2 horas atrás', type: 'contract' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                <div className="w-2 h-2 bg-primary-500 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                  <p className="text-sm text-slate-600">{activity.entity}</p>
                </div>
                <span className="text-xs text-slate-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
