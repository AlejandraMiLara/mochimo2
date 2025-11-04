import React from 'react';

interface HomeProps {
  onGoLogin: () => void;
  onGoRegister: () => void;
}

export const Home: React.FC<HomeProps> = ({ onGoLogin, onGoRegister }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center">
        <h1 className='text-4xl sm:text-6xl font-bold tracking-tight mb-2 bg-gradient-to-r from-fuchsia-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(236,72,153,0.8),_0_0_12px_rgba(168,85,247,0.7)] font-["Lobster Two",cursive]'>
          Mochimo
        </h1>
        <p className="text-slate-200 text-lg sm:text-xl font-semibold mb-4">Plataforma de gestión freelance</p>
        <p className="text-slate-300 text-base sm:text-lg mb-10">Sistema integral para la gestión de proyectos, clientes y contratos. Una solución completa para profesionales independientes y empresas de servicios tecnológicos.</p>

        <div className="flex items-center justify-center gap-5">
          <button
            onClick={onGoRegister}
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold text-white bg-gradient-to-r from-fuchsia-500 to-violet-500 hover:from-fuchsia-500 hover:to-purple-500 drop-shadow-[0_0_6px_rgba(236,72,153,0.8),_0_0_12px_rgba(168,85,247,0.7)]"
          >
            Comenzar gratis
          </button>
          <button
            onClick={onGoLogin}
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold text-slate-100 border border-slate-600/60 hover:border-fuchsia-400/50"
          >
            Iniciar sesión
          </button>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3 text-left">
          <div className="rounded-2xl border border-fuchsia-400/20 bg-slate-900/50 backdrop-blur p-5">
            <h3 className="font-semibold mb-1">Proyectos</h3>
            <p className="text-slate-300 text-sm">Organiza tareas, tiempos y presupuestos con claridad.</p>
          </div>
          <div className="rounded-2xl border border-fuchsia-400/20 bg-slate-900/50 backdrop-blur p-5">
            <h3 className="font-semibold mb-1">Contratos</h3>
            <p className="text-slate-300 text-sm">Centraliza contratos y estados de firma en segundos.</p>
          </div>
          <div className="rounded-2xl border border-fuchsia-400/20 bg-slate-900/50 backdrop-blur p-5">
            <h3 className="font-semibold mb-1">Clientes</h3>
            <p className="text-slate-300 text-sm">Toda la relación con tus clientes en un solo lugar.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
