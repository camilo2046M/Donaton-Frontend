import React from 'react';
import { PublicFormLayout } from '../templates/PublicFormLayout';
import type { NuevaNecesidad } from '../../types';

export const ReportarPage: React.FC = () => {
  async function reportarNecesidad(data: NuevaNecesidad): Promise<void> {
    // Reemplazar con: await fetch('/api/bff/necesidades', { method: 'POST', body: JSON.stringify(data) });
    console.log('Nueva necesidad reportada:', data);
  }

  return (
    <PublicFormLayout
      onSubmit={reportarNecesidad}
      successMessage="¡Tu solicitud fue enviada! El equipo de Donaton te contactará a la brevedad."
    />
  );
};

export default ReportarPage;