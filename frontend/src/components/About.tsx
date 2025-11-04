import React from 'react';

interface AboutProps {
  onGoHome: () => void;
}

export const About: React.FC<AboutProps> = ({ onGoHome }) => {
  return (
    <section className="min-h-[70vh] max-w-5xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className='text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-fuchsia-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(236,72,153,0.8),_0_0_12px_rgba(168,85,247,0.7)]'>
          Acerca de Mochimo
        </h2>
        <p className="text-slate-300 mt-2">Plataforma integral para la gestión freelance.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-fuchsia-400/20 bg-slate-900/50 backdrop-blur p-6">
          <h3 className="font-semibold mb-2">Nuestra misión</h3>
          <p className="text-slate-300 text-sm">
            Simplificar el trabajo de profesionales independientes y empresas de servicios tecnológicos, ofreciendo herramientas modernas para proyectos, contratos y relación con clientes.
          </p>
        </div>
        <div className="rounded-2xl border border-fuchsia-400/20 bg-slate-900/50 backdrop-blur p-6">
          <h3 className="font-semibold mb-2">Qué puedes hacer</h3>
          <ul className="text-slate-300 text-sm list-disc list-inside space-y-1">
            <li>Planificar proyectos y tareas</li>
            <li>Gestionar contratos y estados de firma</li>
            <li>Organizar clientes y facturación</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-10">
        <button onClick={onGoHome} className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold text-white bg-gradient-to-r from-fuchsia-500 to-violet-500 hover:from-fuchsia-500 hover:to-purple-500">
          Volver al inicio
        </button>
      </div>
    </section>
  );
};

