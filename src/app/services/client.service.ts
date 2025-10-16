import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Client } from "../models/client.model";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ClientService {
  private url = 'https://localhost:7270/api/Clientes';

  constructor(private http: HttpClient){}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url);
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.url}/${id}`);
  }

  createClient (client: Client): Observable<Client> {
    return this.http.post<Client>(this.url, client);
  }

  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.url}/${id}`, client);
  }

  deleteClient(id: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
