import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import type { Envio, Necesidad } from '../../types';

const MOCK_ENVIOS: Envio[] = [
  { id: 1, centroAcopioOrigen: 'Centro Norte - Iquique',     destino: 'Comunidad Afectada - Alto Hospicio', tipoTransporte: 'TERRESTRE', estado: 'EN_PREPARACION', fechaCreacion: '2026-05-07T14:30:00' },
  { id: 2, centroAcopioOrigen: 'Centro Central - Santiago',  destino: 'Hospital Regional',                  tipoTransporte: 'AEREO',     estado: 'EN_RUTA',        fechaCreacion: '2026-05-07T15:45:00' },
  { id: 3, centroAcopioOrigen: 'Centro Sur - Concepción',    destino: 'Albergue Talcahuano',                tipoTransporte: 'TERRESTRE', estado: 'ENTREGADO',      fechaCreacion: '2026-05-06T09:10:00' },
  { id: 4, centroAcopioOrigen: 'Centro Norte - Antofagasta', destino: 'Villa Rural Calama',                 tipoTransporte: 'MARITIMO',  estado: 'EN_PREPARACION', fechaCreacion: '2026-05-07T08:00:00' },
];

const MOCK_NECESIDADES: Necesidad[] = [
  { id: 101, recursoNecesitado: 'Agua Potable',            cantidad: 500,  ubicacionGeografica: 'Plaza de Armas, San Bernardo',   estado: 'PENDIENTE', fechaReporte: '2026-05-06T09:15:00' },
  { id: 102, recursoNecesitado: 'Mantas Térmicas',         cantidad: 50,   ubicacionGeografica: 'Albergue Municipal, Valparaíso', estado: 'ATENDIDA',  fechaReporte: '2026-05-05T20:10:00' },
  { id: 103, recursoNecesitado: 'Medicamentos Básicos',    cantidad: 200,  ubicacionGeografica: 'Posta Rural, Coquimbo',          estado: 'PENDIENTE', fechaReporte: '2026-05-07T11:30:00' },
  { id: 104, recursoNecesitado: 'Alimentos No Perecibles', cantidad: 1500, ubicacionGeografica: 'Centro Evacuados, Rancagua',     estado: 'ATENDIDA',  fechaReporte: '2026-05-04T16:45:00' },
];

export interface DashboardPageProps {
  onNavigate: (key: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [envios]      = useState<Envio[]>(MOCK_ENVIOS);
  const [necesidades] = useState<Necesidad[]>(MOCK_NECESIDADES);

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