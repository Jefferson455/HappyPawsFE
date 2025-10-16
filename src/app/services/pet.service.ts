import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pet } from "../models/pet.model";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class PetService {
  private url = 'https://localhost:7270/api/Mascotas';
  constructor(private http: HttpClient){}

  getPets(): Observable<Pet[]>{
    return this.http.get<Pet[]>(this.url);
  }

  getPet(id: number): Observable<Pet>{
    return this.http.get<Pet>(`${this.url}/${id}`);
  }

  createPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.url, pet);
  }
  updatepet(id: number, pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.url}/${id}`, pet);
  }

  deletePet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
    }

}
