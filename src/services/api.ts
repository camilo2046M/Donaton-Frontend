import type {
  Envio,
  EnvioFallback,
  Necesidad,
  NuevoEnvio,
  NuevaNecesidad,
  ApiError,
} from '../types';

// ─── Cliente base ─────────────────────────────────────────────────────────────

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });

  if (!res.ok) {
    // Parsea el error estandarizado del GlobalExceptionHandler
    const err: ApiError = await res.json().catch(() => ({
      timestamp: new Date().toISOString(),
      status: res.status,
      error: res.statusText,
      message: 'Error inesperado. Intenta nuevamente.',
      path: url,
    }));
    throw err;
  }

  return res.json();
}

// ─── Logística ────────────────────────────────────────────────────────────────

export const logisticaApi = {
  /**
   * GET /api/bff/logistica/envios
   * Puede retornar fallback si el microservicio está caído.
   */
  getEnvios: (): Promise<Envio[] | EnvioFallback[]> =>
    apiFetch('/api/bff/logistica/envios'),

  /**
   * POST /api/bff/logistica/envios
   */
  crearEnvio: (data: NuevoEnvio): Promise<Envio> =>
    apiFetch('/api/bff/logistica/envios', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /**
   * PATCH /api/bff/logistica/envios/:id/estado
   */
  actualizarEstado: (id: number, estado: string): Promise<Envio> =>
    apiFetch(`/api/bff/logistica/envios/${id}/estado`, {
      method: 'PATCH',
      body: JSON.stringify({ estado }),
    }),
};

// ─── Necesidades ──────────────────────────────────────────────────────────────

export const necesidadesApi = {
  /**
   * GET /api/bff/necesidades
   */
  getNecesidades: (): Promise<Necesidad[]> =>
    apiFetch('/api/bff/necesidades'),

  /**
   * POST /api/bff/necesidades
   */
  crearNecesidad: (data: NuevaNecesidad): Promise<Necesidad> =>
    apiFetch('/api/bff/necesidades', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /**
   * PATCH /api/bff/necesidades/:id/atender
   */
  atenderNecesidad: (id: number): Promise<{ id: number; estado: string }> =>
    apiFetch(`/api/bff/necesidades/${id}/atender`, { method: 'PATCH' }),
};

// ── Agregar esto al archivo src/services/api.ts existente ────────────────────
// (al final del archivo, después de necesidadesApi)

import type { Donacion, NuevaDonacion } from '../types';

export const donacionesApi = {
  /** GET /api/bff/donaciones */
  listarDonaciones: (): Promise<Donacion[]> =>
    apiFetch('/api/bff/donaciones'),

  /** POST /api/bff/donaciones */
  crearDonacion: (data: NuevaDonacion): Promise<Donacion> =>
    apiFetch('/api/bff/donaciones', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /** PATCH /api/bff/donaciones/{id}/completar */
  completarDonacion: (id: number): Promise<{ id: number; estado: string }> =>
    apiFetch(`/api/bff/donaciones/${id}/completar`, { method: 'PATCH' }),
};