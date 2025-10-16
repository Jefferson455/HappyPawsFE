import {Pet} from "./pet.model";

export interface Client {
  id?: number;
  name: string;
  phone: string;
  address: string;
  uodate?: boolean;
  pet?: Pet[];
}
