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
  id = 0;
  ngOnInit(): void {
   const id = this.route.snapshot.paramMap.get('id');
    this.obtenerMascota(id)
  }

  obtenerMascota(id: any) {
    this.mascotaService.getMascota(id).subscribe({
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

  editarMascota(mascota: Mascota) {
    mascota.editar = true;
    this.dialog
      .open(ModalMascotaComponent, {
        disableClose: true,
        data: mascota,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) this.obtenerMascota(this.id);
      });
  }
}
