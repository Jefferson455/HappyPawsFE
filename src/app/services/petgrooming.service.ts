import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { petgrooming } from "../models/petgrooming.model";

@Injectable({providedIn: 'root'})
export class PetGroomingService{
  private url = 'https://localhost:7270/api/Peluqueria';

  constructor(private http: HttpClient){}

  getPetGrooming(id: number): Observable<petgrooming[]> {
    return this.http.get<petgrooming[]>(`${this.url}/${id}`);
  }

  createPetGrooming(petgrooming: petgrooming): Observable<petgrooming>{
    return this.http.post<petgrooming>(this.url, petgrooming);
  }

  updatePetGrooming(id: number, petgrooming: petgrooming): Observable<petgrooming> {
    return this.http.put<petgrooming>(`${this.url}/${id}`, petgrooming);
  }

  deletePetGrooming(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
