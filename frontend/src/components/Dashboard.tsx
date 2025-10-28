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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Bienvenido al Dashboard</h1>
      </div>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px' }}>
        <h3>¡Sesión iniciada correctamente!</h3>
        <p>Contenido</p>
      </div>
      <button 
          onClick={handleLogout}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#dc3545', 
            color: 'white', 
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Cerrar Sesión
        </button>
    </div>
  );
};