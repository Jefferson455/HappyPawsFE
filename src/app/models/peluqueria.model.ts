export interface peluqueria {
    id?: number;
    fecha?: Date;
    precio: number;
    abono: number;
    formaPago: string;
    observaciones: string;
    mascotaId?: number;
      editar?: boolean;
}
