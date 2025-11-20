import { Mascota } from './mascota.model';

export interface Cliente {
  id?: number;
  nombre: string;
  telefono: string;
  direccion: string;
  editar?: boolean;
  mascotas?: Mascota[];
}
