import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Daycare } from "../models/daycare.model";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class DaycareService {
  private url = 'https://localhost:7270/api/Guarderia';
  constructor(private http: HttpClient){}

  getDaycare(id: number): Observable<Daycare[]> {
    return this.http.get<Daycare[]>(`${this.url}/${id}`);
  }

  createDaycare(daycare: Daycare): Observable<Daycare> {
    return this.http.post<Daycare>(this.url, daycare);
  }

  updateDaycare(id: number, daycare: Daycare): Observable<Daycare> {
    return this.http.put<Daycare>(`${this.url}/${id}`, daycare);
  }

  deleteDaycare(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
