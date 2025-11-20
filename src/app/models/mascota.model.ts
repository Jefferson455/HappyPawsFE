import { Cliente } from "./cliente.model";

export interface Mascota {
  id?: number;
  nombre: string;
   nombreCliente?: string;
  raza: string;
  especie: string;
  sexo: string;
  fechaNacimiento: Date;
  observaciones?: string;
  clienteId?: number;
  editar?: boolean;
  cliente?: Cliente;
}
