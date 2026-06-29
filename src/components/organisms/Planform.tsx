import React, { useState, useEffect } from 'react';
import { ModalHeader } from '../molecules/ModalHeader';
import { FormField }   from '../molecules/FormField';
import { Input }       from '../atoms/Input';
import { Select }      from '../atoms/Select';
import { Button }      from '../atoms/Button';
import type { NuevoEnvio, TipoTransporte, Donacion } from '../../types';
import { donacionesApi } from '../../services/api'; // Asegúrate de que la ruta sea correcta

export interface PlanFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: NuevoEnvio) => void | Promise<void>;
  loading?: boolean;
}

type FormErrors = Partial<Record<keyof NuevoEnvio, string>>;

const TRANSPORTE_OPTIONS = [
  { value: 'TERRESTRE', label: '🚛 Terrestre' },
  { value: 'AEREO',     label: '✈️ Aéreo'     },
  { value: 'MARITIMO',  label: '🚢 Marítimo'  },
];

/**
 * ORGANISMO — PlanForm
 * Modal para registrar un nuevo envío con protección anti-crashes.
 */
export const PlanForm: React.FC<PlanFormProps> = ({ open, onClose, onSubmit, loading = false }) => {
  const [form, setForm]     = useState<Partial<NuevoEnvio>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [donacionesOpts, setDonacionesOpts] = useState<{value: string, label: string}[]>([]);

  // EFECTO PROTEGIDO: Cargar donaciones de forma segura
  useEffect(() => {
    if (open) {
      donacionesApi.listarDonaciones()
        .then((data: any) => {
          // ESCUDO 1: Si el BFF devuelve el Fallback del Circuit Breaker
          if (Array.isArray(data) && data.length > 0 && 'error' in data[0]) {
            setDonacionesOpts([{ value: '', label: '⚠️ Servicio de donaciones caído' }]);
            return;
          }

          // ESCUDO 2: Si por alguna razón la data no es un arreglo
          if (!Array.isArray(data)) {
             setDonacionesOpts([]);
             return;
          }

          // Mapeo Seguro
          const opts = data.map((d: Donacion) => ({
            value: String(d.id),
            label: `#${d.id} - ${d.nombreObjeto || d.tipo} (${d.donanteNombre || 'Anónimo'})`
          }));
          
          setDonacionesOpts(opts);
        })
        .catch(err => {
          console.error("Error cargando donaciones:", err);
          setDonacionesOpts([{ value: '', label: '❌ Error de conexión' }]);
        });
    }
  }, [open]);

  if (!open) return null;

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.donacionId || isNaN(Number(form.donacionId))) e.donacionId = 'Selecciona una donación válida.';
    if (!form.centroAcopioOrigen?.trim()) e.centroAcopioOrigen = 'El centro de acopio es requerido.';
    if (!form.destino?.trim())            e.destino            = 'El destino es requerido.';
    if (!form.tipoTransporte)             e.tipoTransporte     = 'Selecciona un tipo de transporte.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    
    try {
      await onSubmit({
        ...form,
        donacionId: Number(form.donacionId)
      } as NuevoEnvio);
      
      setForm({});
      setErrors({});
    } catch (error) {
      console.error("Error ejecutando onSubmit:", error);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="plan-form-title"
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: '#fff', borderRadius: '12px',
          border: '0.5px solid rgba(0,0,0,0.15)',
          width: '480px', maxWidth: '92vw', padding: '1.5rem',
        }}
      >
        <ModalHeader title="Planificar Nuevo Envío" onClose={onClose} />

        <form onSubmit={handleSubmit} noValidate>
          
          <FormField id="plan-donacion" label="Asignar Donación" required error={errors.donacionId}>
            <Select
              id="plan-donacion"
              options={donacionesOpts}
              placeholder="Seleccionar donación..."
              error={!!errors.donacionId}
              value={form.donacionId ? String(form.donacionId) : ''}
              onChange={(e) => setForm((f) => ({ ...f, donacionId: Number(e.target.value) }))}
            />
          </FormField>

          <FormField id="plan-origen" label="Centro de Acopio de Origen" required error={errors.centroAcopioOrigen}>
            <Input
              id="plan-origen"
              placeholder="Ej: Centro Norte - Iquique"
              error={!!errors.centroAcopioOrigen}
              value={form.centroAcopioOrigen ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, centroAcopioOrigen: e.target.value }))}
              aria-describedby={errors.centroAcopioOrigen ? 'plan-origen-error' : undefined}
            />
          </FormField>

          <FormField id="plan-destino" label="Destino" required error={errors.destino}>
            <Input
              id="plan-destino"
              placeholder="Ej: Comunidad Afectada - Alto Hospicio"
              error={!!errors.destino}
              value={form.destino ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, destino: e.target.value }))}
            />
          </FormField>

          <FormField id="plan-transporte" label="Tipo de Transporte" required error={errors.tipoTransporte}>
            <Select
              id="plan-transporte"
              options={TRANSPORTE_OPTIONS}
              placeholder="Seleccionar…"
              error={!!errors.tipoTransporte}
              value={form.tipoTransporte ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, tipoTransporte: e.target.value as TipoTransporte }))}
            />
          </FormField>

          <div
            style={{
              display: 'flex', justifyContent: 'flex-end', gap: '8px',
              paddingTop: '1rem', borderTop: '0.5px solid rgba(0,0,0,0.1)',
            }}
          >
            <Button variant="secondary" type="button" onClick={onClose}>Cancelar</Button>
            <Button variant="primary" type="submit" loading={loading}>Registrar Envío</Button>
          </div>
        </form>
      </div>
    </div>
  );
};