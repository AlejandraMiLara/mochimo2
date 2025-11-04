import React from 'react';
import { authService } from '../services/api';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await authService.logout();
      onLogout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0014] via-[#0b031f] to-[#0f1228] text-slate-100 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-16 -left-24 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute top-16 -right-20 h-[28rem] w-[28rem] rounded-full bg-purple-600/20 blur-3xl" />
      <header className="sticky top-0 backdrop-blur bg-slate-900/70 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
        <div className='text-lg font-bold tracking-tight bg-gradient-to-r from-fuchsia-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(236,72,153,0.8),_0_0_12px_rgba(168,85,247,0.7)] font-["Lobster Two",cursive]'>Mochimo</div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-violet-500 hover:from-fuchsia-500 hover:to-purple-500 px-4 py-2 font-semibold text-white drop-shadow-[0_0_6px_rgba(236,72,153,0.8),_0_0_12px_rgba(168,85,247,0.7)]" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </header>

      <main className="max-w-5xl mx-auto p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-fuchsia-400/30 bg-slate-900/60 backdrop-blur p-6 shadow-2xl hover:ring-1 hover:ring-fuchsia-400/30 transition">
            <h3 className="text-lg font-semibold mb-1">¡Sesión iniciada correctamente!</h3>
            <p className="text-slate-300">Bienvenido. Aquí irá el contenido de tu aplicación.</p>
          </div>
          <div className="rounded-2xl border border-fuchsia-400/30 bg-slate-900/60 backdrop-blur p-6 shadow-2xl hover:ring-1 hover:ring-fuchsia-400/30 transition">
            <h3 className="text-lg font-semibold mb-1">Tus accesos</h3>
            <p className="text-slate-300">Atajos o métricas pueden ir aquí.</p>
          </div>
        </div>
      </main>
    </div>
  );
};
