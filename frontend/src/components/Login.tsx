import React, { useState } from 'react';
import axios from 'axios';
import { authService, type LoginData } from '../services/api';

interface LoginProps {
  onLoginSuccess: () => void;
  onSwitchToRegister: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login(formData);
      onLoginSuccess();
    } catch (err: unknown) {
      let message = 'Error al iniciar sesión';
      if (axios.isAxiosError(err)) {
        if (!err.response) {
          message = 'No se pudo conectar con el servidor';
        } else {
          const data: any = err.response.data;
          if (Array.isArray(data?.message)) message = data.message.join(', ');
          else if (typeof data?.message === 'string') message = data.message;
          else if (typeof data === 'string') message = data;
        }
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full rounded-2xl border border-fuchsia-400/30 bg-slate-900/60 backdrop-blur p-6 shadow-2xl hover:ring-1 hover:ring-fuchsia-400/30 transition">
      <h2 className='text-xl font-semibold bg-gradient-to-r from-fuchsia-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(236,72,153,0.8),_0_0_12px_rgba(168,85,247,0.7)] font-["Lobster Two",cursive]'>Iniciar sesión</h2>
      <p className="text-sm text-slate-300 mb-4">Accede con tus credenciales para continuar.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1" htmlFor="email">Email</label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            placeholder="tucorreo@ejemplo.com"
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1" htmlFor="password">Contraseña</label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            autoComplete="current-password"
            placeholder="********"
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/40 bg-red-500/10 text-red-200 px-3 py-2 text-sm" role="alert">
            {error}
          </div>
        )}

        <button 
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-violet-500 hover:from-fuchsia-500 hover:to-purple-500 px-4 py-2 font-semibold text-white disabled:opacity-60 drop-shadow-[0_0_6px_rgba(236,72,153,0.8),_0_0_12px_rgba(168,85,247,0.7)]"
          type="submit" 
          disabled={loading}
          aria-busy={loading}
        >
          {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-r-transparent" />}
          {loading ? 'Iniciando...' : 'Iniciar Sesión'}
        </button>
      </form>

      <p className="text-center text-slate-300 text-sm mt-4">
        ¿No tienes cuenta?{' '}
        <button 
          type="button"
          onClick={onSwitchToRegister}
          className="text-fuchsia-400 hover:underline"
        >
          Regístrate
        </button>
      </p>
    </div>
  );
};
