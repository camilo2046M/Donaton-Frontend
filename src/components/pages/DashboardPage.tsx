import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
// 1. IMPORTANTE: Cambiamos las importaciones para traer bffApi en lugar de las APIs separadas
import { bffApi } from '../../services/api'; 
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
    
    // 2. IMPORTANTE: Reemplazamos Promise.all por una sola llamada al BFF
    bffApi.getDashboardResumen()
      .then((resumenData) => {
        // El BFF nos devuelve todo armado, solo separamos para el estado local
        setEnvios(resumenData.envios);
        setNecesidades(resumenData.necesidades);
      })
      .catch((err: ApiError) => {
        showError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // El array vacío asegura que esto solo corra una vez al montar el componente

  // ── Renderizado condicional de carga ──────────────────────────────────────
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