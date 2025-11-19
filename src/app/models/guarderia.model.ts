export interface guarderia {
    id?: number;
    fechaIngreso?: Date;
    fechaSalida?: Date;
    precio: number;
    abono: number;
    formaPago: string;
    observaciones: string;
    mascotaId?: number;
    editar?: boolean;
}
