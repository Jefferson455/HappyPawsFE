import { MatCardModule } from '@angular/material/card';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { peluqueria } from '../../models/peluqueria.model';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PeluqueriaService } from '../../services/peluqueria.service';
import { UtilidadesService } from '../../services/utilidades.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalPeluqueriaComponent } from '../modales/modal-peluqueria/modal-peluqueria.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-peluqueria',
  imports: [MatCardModule, MatIconModule, MatDividerModule,
    MatFormFieldModule, MatTableModule, MatPaginatorModule,
    MatInputModule, MatButtonModule, CommonModule
  ],
  templateUrl: './peluqueria.component.html',
  styleUrls: ['./peluqueria.component.css']
})
export class PeluqueriaComponent {
  dataInicio: peluqueria[] = [];
  dataListaPeluqueria = new MatTableDataSource(this.dataInicio);
  columnasTabla: string[] = [
    'fecha',
    'hora',
    'precio',
    'abono',
    'saldo',
    'formaPago',
    'observaciones',
    'acciones'
  ];
  constructor(private dialog: MatDialog,
    private peluqueriaService: PeluqueriaService,
    private utilidades: UtilidadesService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.obtenerPeluqueria();
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaPeluqueria.filter = filterValue.trim().toLowerCase();
  }


  obtenerPeluqueria() {
    const id = Number(this.route.snapshot.paramMap.get('id')!);
    this.peluqueriaService.getPeluqueria(id).subscribe({
      next: (data) => {
        console.log(data)
        if (data) {
          this.dataInicio = data;
          this.dataListaPeluqueria.data = this.dataInicio;
        }
        else {
          this.utilidades.mostrarAlerta("No se encontraron datos", "Error!");
        }
      },
      error: (e) => { },
    });
  }

  abrirFormulario(peluqueria?: peluqueria): void {
    const id = Number(this.route.snapshot.paramMap.get('id')!);
    peluqueria = { mascotaId: id, precio: 0, abono: 0, formaPago: '', observaciones: '' };

    this.dialog
      .open(ModalPeluqueriaComponent, {
        disableClose: true,
        data: peluqueria
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) this.obtenerPeluqueria();
      });
  }

  eliminar(_peluqueria: peluqueria) {
    Swal.fire({
      title: '¿Desea eliminar el servicio de peluqueria?',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'No, volver',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Si, eliminar',
    }).then((resultado) => {
      if (!resultado.isConfirmed) {

        this.peluqueriaService.eliminarPeluqueria(_peluqueria.id ?? 0).subscribe({
          next: (res) => {
            this.utilidades.mostrarAlerta("Servicio de peluqueria fue eliminado", "Listo!");
            this.obtenerPeluqueria();
          },
          error: (e) => { this.utilidades.mostrarAlerta("Error al eliminar el servicio de peluqueria", "Error!"); }
        })
      }
    });
  }


  editar(peluqueria: peluqueria) {
    const id = Number(this.route.snapshot.paramMap.get('id')!);
    peluqueria.mascotaId = id;
    peluqueria.editar = true;

    this.dialog
      .open(ModalPeluqueriaComponent, {
        disableClose: true,
        data: peluqueria,
        autoFocus: true, // mueve el foco automáticamente
        restoreFocus: true, // devuelve el foco al cerrar
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) this.obtenerPeluqueria();
      });
  }

}

