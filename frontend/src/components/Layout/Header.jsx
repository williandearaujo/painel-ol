
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Moon, 
  Sun,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ onSidebarToggle, sidebarOpen }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState([
    { id: 1, message: '3 contratos vencem em 30 dias', read: false },
    { id: 2, message: 'Nova tarefa atribuída', read: false },
    { id: 3, message: 'Backup concluído com sucesso', read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Implementar busca global
      console.log('Buscar por:', searchTerm);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-lg bg-white/95">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo e Toggle Sidebar */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onSidebarToggle}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate('/dashboard')}
          >
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-xl group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">OL</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-slate-900">OL Tecnologia</h1>
              <p className="text-xs text-slate-500 -mt-1">Painel Administrativo</p>
            </div>
          </div>
        </div>

        {/* Pesquisa Global */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <form onSubmit={handleSearch} className="w-full relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Pesquisar clientes, tarefas, equipamentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-slate-500"
            />
          </form>
        </div>

        {/* Ações do Usuário */}
        <div className="flex items-center space-x-3">
          {/* Toggle Tema */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors relative"
            title={darkMode ? 'Modo Claro' : 'Modo Escuro'}
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-slate-600" />
            ) : (
              <Moon className="h-5 w-5 text-slate-600" />
            )}
          </button>

          {/* Notificações */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl hover:bg-slate-100 transition-colors relative"
              title="Notificações"
            >
              <Bell className="h-5 w-5 text-slate-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown de Notificações */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-900">Notificações</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0 ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <p className="text-sm text-slate-800">{notification.message}</p>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-slate-100">
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    Ver todas as notificações
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Menu do Usuário */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-slate-900">
                  {user?.email || 'Admin'}
                </p>
                <p className="text-xs text-slate-500">Administrador</p>
              </div>
            </button>

            {/* Dropdown do Usuário */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-900">
                    {user?.email || 'admin@oltecnologia.com'}
                  </p>
                  <p className="text-xs text-slate-500">Administrador do Sistema</p>
                </div>
                
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <User className="h-4 w-4 mr-3" />
                    Meu Perfil
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <Settings className="h-4 w-4 mr-3" />
                    Configurações
                  </button>
                </div>
                
                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pesquisa Mobile */}
      <div className="md:hidden px-6 pb-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-slate-500"
          />
        </form>
      </div>

      {/* Overlay para fechar dropdowns */}
      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
};

<<<<<<< HEAD
export default Header;
=======
export default Header;
>>>>>>> 8c88711f17b8648c5f5172f907f5debec38118be
