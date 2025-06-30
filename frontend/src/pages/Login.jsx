
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
=======
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
>>>>>>> 8c88711f17b8648c5f5172f907f5debec38118be

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

=======
    
>>>>>>> 8c88711f17b8648c5f5172f907f5debec38118be
    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-large p-8 border border-white/20">
          {/* Logo e Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 shadow-medium">
              <span className="text-white font-bold text-2xl">OL</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Bem-vindo de volta</h1>
            <p className="text-slate-600">Entre em sua conta para continuar</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 animate-slide-down">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="seu@email.com"
                  disabled={loading}
=======
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600"></div>
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 right-32 w-48 h-48 bg-white bg-opacity-5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-white bg-opacity-10 rounded-full blur-lg animate-pulse delay-500"></div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-3xl backdrop-blur-xl mb-6 border border-white border-opacity-20">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            OL Tecnologia
          </h1>
          <p className="text-white text-opacity-90 font-medium">
            Painel Administrativo
          </p>
        </div>

        {/* Login Form */}
        <div className="glass-card p-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fade-in-up">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="form-label">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input pl-12"
                  placeholder="seu@email.com"
                  disabled={loading}
                  autoComplete="email"
>>>>>>> 8c88711f17b8648c5f5172f907f5debec38118be
                />
              </div>
            </div>

            {/* Password Field */}
<<<<<<< HEAD
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="••••••••"
                  disabled={loading}
=======
            <div className="space-y-2">
              <label className="form-label">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input pl-12 pr-12"
                  placeholder="Digite sua senha"
                  disabled={loading}
                  autoComplete="current-password"
>>>>>>> 8c88711f17b8648c5f5172f907f5debec38118be
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
<<<<<<< HEAD
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
=======
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
>>>>>>> 8c88711f17b8648c5f5172f907f5debec38118be
                </button>
              </div>
            </div>

<<<<<<< HEAD
            {/* Forgot Password */}
=======
            {/* Remember & Forgot */}
>>>>>>> 8c88711f17b8648c5f5172f907f5debec38118be
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
<<<<<<< HEAD
                  className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-slate-600">Lembrar de mim</span>
              </label>
              <button
                type="button"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
=======
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-600">Lembrar de mim</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
>>>>>>> 8c88711f17b8648c5f5172f907f5debec38118be
                disabled={loading}
              >
                Esqueceu a senha?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
<<<<<<< HEAD
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-medium hover:shadow-large"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Entrando...</span>
                </div>
              ) : (
                'Entrar'
=======
              className="w-full btn-primary flex items-center justify-center space-x-2 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Entrar no Sistema</span>
                  <ArrowRight className="h-5 w-5" />
                </>
>>>>>>> 8c88711f17b8648c5f5172f907f5debec38118be
              )}
            </button>
          </form>

          {/* Footer */}
<<<<<<< HEAD
          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-600">
              Não tem uma conta?{' '}
              <button className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
                Solicitar Acesso
              </button>
            </p>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            © 2024 OL Tecnologia. Todos os direitos reservados.
          </p>
        </div>
=======
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              © 2024 OL Tecnologia. Todos os direitos reservados.
            </p>
          </div>
        </div>
>>>>>>> 8c88711f17b8648c5f5172f907f5debec38118be
      </div>
    </div>
  );
};

export default Login;
