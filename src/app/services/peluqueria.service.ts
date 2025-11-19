import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { peluqueria } from '../models/peluqueria.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeluqueriaService {
  private url = 'http://localhost:5001/api/Peluqueria';
  constructor(private http: HttpClient) { }

  getPeluqueria(id: number): Observable<peluqueria[]> {
    return this.http.get<peluqueria[]>(`${this.url}/${id}`);
  }

  crearPeluqueria(peluqueria: peluqueria): Observable<peluqueria> {
    return this.http.post<peluqueria>(this.url, peluqueria);
  }
  actualizarPeluqueria(id: number, peluqueria: peluqueria): Observable<peluqueria> {
    return this.http.put<peluqueria>(`${this.url}/${id}`, peluqueria);
  }

  eliminarPeluqueria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
