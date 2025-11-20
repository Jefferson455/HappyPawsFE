import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { guarderia } from '../models/guarderia.model';

@Injectable({
  providedIn: 'root'
})
export class GuarderiaService {
  private url = 'http://localhost:5001/api/Guarderia';
  constructor(private http: HttpClient) { }

  getGuarderia(id: number): Observable<guarderia[]> {
    return this.http.get<guarderia[]>(`${this.url}/${id}`);
  }

  crearGuarderia(peluqueria: guarderia): Observable<guarderia> {
    return this.http.post<guarderia>(this.url, peluqueria);
  }
  actualizarGuarderia(id: number, guarderia: guarderia): Observable<guarderia> {
    return this.http.put<guarderia>(`${this.url}/${id}`, guarderia);
  }

  eliminarGuarderia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
 