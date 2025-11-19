import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mascota } from '../models/mascota.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private url = 'http://localhost:5001/api/Mascotas';
  constructor(private http: HttpClient) { }

  getMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.url);
  }
  getMascota(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.url}/${id}`);
  }

  crearMascota(cliente: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(this.url, cliente);
  }

  actualizarMascota(id: number, cliente: Mascota): Observable<Mascota> {
    return this.http.put<Mascota>(`${this.url}/${id}`, cliente);
  }

  eliminarMascota(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }


}
