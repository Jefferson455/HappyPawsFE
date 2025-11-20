import { Component } from '@angular/core';
import { guarderia } from '../../models/guarderia.model';
import { ModalGuarderiaComponent } from '../modales/modal-guarderia/modal-guarderia.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UtilidadesService } from '../../services/utilidades.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { GuarderiaService } from '../../services/guarderia.service';

@Component({
  selector: 'app-guarderia',
  imports: [MatCardModule, MatIconModule, MatDividerModule,
    MatFormFieldModule, MatTableModule, MatPaginatorModule,
    MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './guarderia.component.html',
  styleUrl: './guarderia.component.css'
})
export class GuarderiaComponent {
  dataInicio: guarderia[] = [];
  dataListaPeluqueria = new MatTableDataSource(this.dataInicio);
  columnasTabla: string[] = [
    'fechaIngreso',
    'fechaSalida',
    'precio',
    'abono',
    'saldo',
    'formaPago',
    'observaciones',
    'acciones'
  ];
  constructor(private dialog: MatDialog,
    private guarderiaService: GuarderiaService,
    private utilidades: UtilidadesService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.obtenerGuarderia();
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaPeluqueria.filter = filterValue.trim().toLowerCase();
  }

  obtenerGuarderia() {
    const id = Number(this.route.snapshot.paramMap.get('id')!);
    this.guarderiaService.getGuarderia(id).subscribe({
      next: (data) => {
        if (data) {
          console.log(data)
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


  abrirFormulario(guarderia?: guarderia): void {
    const id = Number(this.route.snapshot.paramMap.get('id')!);
    guarderia = { mascotaId: id, precio: 0, abono: 0, formaPago: '', observaciones: '' };

    this.dialog
      .open(ModalGuarderiaComponent, {
        disableClose: true,
        data: guarderia
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) this.obtenerGuarderia();
      });
  }

  eliminar(_guarderia: guarderia) {
    Swal.fire({
      title: '¿Desea eliminar el servicio de guarderia?',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'No, volver',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Si, eliminar',
    }).then((resultado) => {
      if (!resultado.isConfirmed) {

        this.guarderiaService.eliminarGuarderia(_guarderia.id ?? 0).subscribe({
          next: (res) => {
            this.utilidades.mostrarAlerta("Servicio de guarderia fue eliminado", "Listo!");
            this.obtenerGuarderia();
          },
          error: (e) => { this.utilidades.mostrarAlerta("Error al eliminar el servicio de guarderia", "Error!"); }
        })
      }
    });
  }


  editar(guarderia: guarderia) {
    const id = Number(this.route.snapshot.paramMap.get('id')!);
    guarderia.mascotaId = id;
    guarderia.editar = true;

    this.dialog
      .open(ModalGuarderiaComponent, {
        disableClose: true,
        data: guarderia,
        autoFocus: true, // mueve el foco automáticamente
        restoreFocus: true, // devuelve el foco al cerrar
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) this.obtenerGuarderia();
      });
  }
}
