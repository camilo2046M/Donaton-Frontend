import React, { useState } from 'react';
import { NeedsAdminLayout } from '../templates/NeedsAdminLayout';
import type { Necesidad } from '../../types';

const MOCK_NECESIDADES: Necesidad[] = [
  { id: 101, recursoNecesitado: 'Agua Potable',            cantidad: 500,  ubicacionGeografica: 'Plaza de Armas, San Bernardo',   estado: 'PENDIENTE', fechaReporte: '2026-05-06T09:15:00' },
  { id: 102, recursoNecesitado: 'Mantas Térmicas',         cantidad: 50,   ubicacionGeografica: 'Albergue Municipal, Valparaíso', estado: 'ATENDIDA',  fechaReporte: '2026-05-05T20:10:00' },
  { id: 103, recursoNecesitado: 'Medicamentos Básicos',    cantidad: 200,  ubicacionGeografica: 'Posta Rural, Coquimbo',          estado: 'PENDIENTE', fechaReporte: '2026-05-07T11:30:00' },
  { id: 104, recursoNecesitado: 'Alimentos No Perecibles', cantidad: 1500, ubicacionGeografica: 'Centro Evacuados, Rancagua',     estado: 'ATENDIDA',  fechaReporte: '2026-05-04T16:45:00' },
];

export const NecesidadesPage: React.FC = () => {
  const [necesidades, setNecesidades] = useState<Necesidad[]>(MOCK_NECESIDADES);
  const [loading]                     = useState<boolean>(false);

  async function marcarAtendida(id: number): Promise<void> {
    // Reemplazar con: await fetch(`/api/bff/necesidades/${id}/atender`, { method: 'PATCH' });
    setNecesidades((prev: Necesidad[]) =>
      prev.map((n: Necesidad) =>
        n.id === id ? { ...n, estado: 'ATENDIDA' as const } : n
      )
    );
  }

  return (
    <NeedsAdminLayout
      necesidades={necesidades}
      loading={loading}
      onAtender={marcarAtendida}
    />
  );
};

export default NecesidadesPage;