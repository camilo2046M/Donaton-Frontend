import React, { useState } from 'react';
import { LogisticsLayout } from '../templates/LogisticsLayout';
import type { Envio, EnvioFallback, NuevoEnvio } from '../../types';

const MOCK_ENVIOS: Envio[] = [
  { id: 1, centroAcopioOrigen: 'Centro Norte - Iquique',     destino: 'Comunidad Afectada - Alto Hospicio', tipoTransporte: 'TERRESTRE', estado: 'EN_PREPARACION', fechaCreacion: '2026-05-07T14:30:00' },
  { id: 2, centroAcopioOrigen: 'Centro Central - Santiago',  destino: 'Hospital Regional',                  tipoTransporte: 'AEREO',     estado: 'EN_RUTA',        fechaCreacion: '2026-05-07T15:45:00' },
  { id: 3, centroAcopioOrigen: 'Centro Sur - Concepción',    destino: 'Albergue Talcahuano',                tipoTransporte: 'TERRESTRE', estado: 'ENTREGADO',      fechaCreacion: '2026-05-06T09:10:00' },
  { id: 4, centroAcopioOrigen: 'Centro Norte - Antofagasta', destino: 'Villa Rural Calama',                 tipoTransporte: 'MARITIMO',  estado: 'EN_PREPARACION', fechaCreacion: '2026-05-07T08:00:00' },
];

export const EnviosPage: React.FC = () => {
  const [envios, setEnvios]   = useState<Envio[] | EnvioFallback[]>(MOCK_ENVIOS);
  const [loading]             = useState<boolean>(false);
  const [saving, setSaving]   = useState<boolean>(false);

  async function crearEnvio(data: NuevoEnvio): Promise<void> {
    setSaving(true);
    // Reemplazar con: await fetch('/api/bff/logistica/envios', { method: 'POST', body: JSON.stringify(data) });
    const nuevo: Envio = {
      id: Date.now(),
      ...data,
      estado: 'EN_PREPARACION',
      fechaCreacion: new Date().toISOString(),
    };
    setEnvios((prev: Envio[] | EnvioFallback[]) => [...(prev as Envio[]), nuevo]);
    setSaving(false);
  }

  return (
    <LogisticsLayout
      envios={envios}
      loading={loading}
      saving={saving}
      onCreateEnvio={crearEnvio}
    />
  );
};

export default EnviosPage;