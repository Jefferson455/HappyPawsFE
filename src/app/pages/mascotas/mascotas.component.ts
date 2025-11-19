import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Mascota } from '../../models/mascota.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalMascotaComponent } from '../modales/modal-mascota/modal-mascota.component';
import { MascotaService } from '../../services/mascota.service';
import { UtilidadesService } from '../../services/utilidades.service';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mascotas',
  imports: [MatCardModule, MatIconModule,
    MatDividerModule, MatFormFieldModule,
    MatPaginatorModule, MatTableModule,
    MatTableModule, MatInputModule,
    MatButtonModule,CommonModule
  ],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css'
})
export class MascotasComponent implements OnInit {
  dataInicio: Mascota[] = [];
  dataListaMascotas = new MatTableDataSource(this.dataInicio);
  columnasTabla: string[] = [
    'nombre',
    'raza',
    'especie',
    'sexo',
    'fechaNacimiento',
    'observaciones',
    'cliente',
    'Ver detalles',
    'acciones',
  ];
  constructor(private dialog: MatDialog,
    private mascotaService: MascotaService,
    private utilidades: UtilidadesService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.obtenerMascotas();
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaMascotas.filter = filterValue.trim().toLowerCase();
  }

  abrirFormulario(mascota?: Mascota): void {
    this.dialog
      .open(ModalMascotaComponent, {
        disableClose: true,
        data: mascota,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) this.obtenerMascotas();
      });
  }
  eliminar(_mascota: Mascota) {
    Swal.fire({
      title: '¿Desea eliminar la mascota?',
      text: _mascota.nombre,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'No, volver',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Si, eliminar',
    }).then((resultado) => {
      if (!resultado.isConfirmed) {

        this.mascotaService.eliminarMascota(_mascota.id ?? 0).subscribe({
          next: (res) => {
            this.utilidades.mostrarAlerta("La mascota fue eliminada", "Listo!");
            this.obtenerMascotas();
          },
          error: (e) => { this.utilidades.mostrarAlerta("Error al eliminar la mascota", "Error!"); }
        })
      }
    });
  }

  detalles(mascota: Mascota) {
    this.router.navigate(['/detalles', mascota.id]);
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
        if (resultado === true) this.obtenerMascotas();
      });
  }
  obtenerMascotas() {
    this.mascotaService.getMascotas().subscribe({
      next: (data) => {
        if (data) {
          this.dataInicio = data;
          console.log(data)
          this.dataListaMascotas.data = this.dataInicio;
        }
        else {
          this.utilidades.mostrarAlerta("No se encontraron datos", "Error!");
        }
      },
      error: (e) => { },
    });
  }
}
