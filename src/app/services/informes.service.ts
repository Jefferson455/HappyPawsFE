import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformesService {

  private apiUrl = 'http://localhost:5001/api/informes';

  constructor(private http: HttpClient) {}

  obtenerInforme(filtro: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/buscar`, filtro);
  }
}
