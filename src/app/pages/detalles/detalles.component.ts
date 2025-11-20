import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MascotaService } from '../../services/mascota.service';
import { Mascota } from '../../models/mascota.model';
import { UtilidadesService } from '../../services/utilidades.service';
import { PeluqueriaComponent } from "../peluqueria/peluqueria.component";
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { GuarderiaComponent } from "../guarderia/guarderia.component";
import { CommonModule } from '@angular/common';
import { ModalMascotaComponent } from '../modales/modal-mascota/modal-mascota.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-detalles',
  imports: [MatTabsModule, MatIconModule, PeluqueriaComponent, MatButtonModule, GuarderiaComponent,CommonModule],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent implements OnInit {
  mascota: Mascota | null = null;
  constructor(private route: ActivatedRoute,
    private mascotaService: MascotaService,
    private utilidades: UtilidadesService,
    private router: Router,
    private dialog: MatDialog
  ) { 
        
  }
  id!: number ;
  ngOnInit(): void {
     this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerMascota()
  }

  obtenerMascota() {
    this.mascotaService.getMascota(this.id).subscribe({
      next: (data) => {
        if (data) {
          this.mascota = data;
        }
        else {
          this.utilidades.mostrarAlerta("No se encontraron datos", "Error!");
        }
      },
      error: (e) => { },
    });
  }
  Regresar(){
    this.router.navigate(['/Mascotas']);
  }
calcularEdad(fechaNacimiento?: string | Date): number {
  if (!fechaNacimiento) return 0; // si viene undefined retorna 0

  const fecha = new Date(fechaNacimiento);
  const hoy = new Date();

  let edad = hoy.getFullYear() - fecha.getFullYear();
  const mes = hoy.getMonth() - fecha.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
    edad--;
  }

  return edad;
}


  editarMascota(mascota: Mascota) {
    mascota.editar = true;
    this.dialog
      .open(ModalMascotaComponent, {
        disableClose: true,
        data: mascota,
      })
      .afterClosed()
      .subscribe((resultado) => {
        console.log(resultado)
        if (resultado === true) this.obtenerMascota();
      });
  }
}
