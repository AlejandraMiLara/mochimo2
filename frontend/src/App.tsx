import { useState } from 'react'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Dashboard } from './components/Dashboard'
import { Home } from './components/Home'
import { About } from './components/About'
import './App.css'

type View = 'home' | 'about' | 'login' | 'register' | 'dashboard';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const isAuth = currentView === 'login' || currentView === 'register';

  const handleLoginSuccess = () => {
    setCurrentView('dashboard');
  };

  const handleRegisterSuccess = () => {
    setCurrentView('login');
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
  };

  const handleLogout = () => {
    setCurrentView('home');
  };

  const switchToRegister = () => {
    setCurrentView('register');
  };

  const switchToLogin = () => {
    setCurrentView('login');
  };
  const goHome = () => setCurrentView('home');
  const goAbout = () => setCurrentView('about');

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0a0014] via-[#0b031f] to-[#0f1228] text-slate-100">
      {/* Fondos decorativos estilo neón */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-purple-600/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />

      {/* Header global (no en dashboard para evitar duplicado) */}
      {currentView !== 'dashboard' && (
        <header className="sticky top-0 z-50 backdrop-blur bg-slate-900/60 border-b border-slate-700/60">
          <div className="w-full px-3 sm:px-6 py-3 flex items-center justify-between">
            <button onClick={goHome} className='text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-fuchsia-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(236,72,153,0.8),_0_0_12px_rgba(168,85,247,0.7)] font-["Lobster Two",cursive]'>
              Mochimo
            </button>
            <nav className="flex items-center gap-4">
              <button onClick={goHome} className="text-slate-200 hover:text-fuchsia-300">Inicio</button>
              <button onClick={goAbout} className="text-slate-200 hover:text-fuchsia-300">Acerca</button>
            </nav>
          </div>
        </header>
      )}

      {currentView === 'home' && (
        <Home onGoLogin={switchToLogin} onGoRegister={switchToRegister} />
      )}

      {currentView === 'about' && (
        <About onGoHome={goHome} />
      )}

      {isAuth && (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <div className='inline-block bg-gradient-to-r from-fuchsia-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(236,72,153,0.8),_0_0_12px_rgba(168,85,247,0.7)] text-3xl font-bold tracking-tight font-["Lobster Two",cursive]'>
                Mochimo
              </div>
              <p className="text-sm text-slate-300 font-semibold">Plataforma de gestión freelance</p>
            </div>
            {currentView === 'login' && (
              <Login 
                onLoginSuccess={handleLoginSuccess}
                onSwitchToRegister={switchToRegister}
              />
            )}
            {currentView === 'register' && (
              <Register 
                onRegisterSuccess={handleRegisterSuccess}
                onSwitchToLogin={switchToLogin}
              />
            )}
          </div>
        </div>
      )}

      {currentView === 'dashboard' && (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
