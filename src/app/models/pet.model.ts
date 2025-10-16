import {Client} from "./client.model";

export interface Pet {
  id?: number;
  name: string;
  race: string;
  species: string;
  sex: string;
  dateBirth: Date;
  observations?: string;
  clientId?: number;
  update?: boolean;
  client?: Client;
}
