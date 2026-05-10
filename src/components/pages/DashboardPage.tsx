import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { logisticaApi, necesidadesApi } from '../../services/api';
import { useToast } from '../../hooks/useToast';
import type { Envio, Necesidad, ApiError } from '../../types';

export interface DashboardPageProps {
  onNavigate: (key: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [envios, setEnvios]           = useState<Envio[]>([]);
  const [necesidades, setNecesidades] = useState<Necesidad[]>([]);
  const [loading, setLoading]         = useState<boolean>(true);
  
  const { showError } = useToast();

  // ── Carga inicial de datos ────────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    
    // Promise.all ejecuta ambas peticiones de red en paralelo
    Promise.all([
      logisticaApi.getEnvios(),
      necesidadesApi.getNecesidades()
    ])
      .then(([enviosData, necesidadesData]) => {
        setEnvios(enviosData as Envio[]);
        setNecesidades(necesidadesData);
      })
      .catch((err: ApiError) => {
        showError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // El array vacío asegura que esto solo corra una vez al montar el componente

  // ── Renderizado condicional de carga ──────────────────────────────────────
  // Si tu DashboardLayout no maneja un prop "loading", puedes mostrar un mensaje aquí.
  // (Si tu layout sí lo soporta, puedes pasárselo como prop al igual que en LogisticsLayout).
  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando resumen del sistema...</div>;
  }

  return (
    <DashboardLayout
      envios={envios}
      necesidades={necesidades}
      onGoToLogistica={() => onNavigate('envios')}
      onGoToNecesidades={() => onNavigate('necesidades')}
    />
  );
};

export default DashboardPage;