export interface Daycare {
    id?: number;
    entryDate?: Date;
    departureDate?: Date;
    price: number;
    pass: number;
    formPayment: string;
    observations: string;
    petId?: number;
    update?: boolean;
}
