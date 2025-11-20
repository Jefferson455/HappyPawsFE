import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModalClienteComponent } from '../modales/modal-cliente/modal-cliente.component';
import { RouterModule } from '@angular/router';
import { UtilidadesService } from '../../services/utilidades.service';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatTooltipModule, MatDividerModule, MatPaginatorModule,
    MatFormFieldModule, MatInputModule, RouterModule
  ],
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit, AfterViewInit {

  editarUsuario(cliente: Cliente) {
    cliente.editar = true;
    this.dialog
      .open(ModalClienteComponent, {
        disableClose: true,
        data: cliente,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) this.obtenerClientes();
      });
  }

  columnasTabla: string[] = [
    'nombre',
    'telefono',
    'direccion',
    'acciones',
  ];
  dataInicio: Cliente[] = [];
  dataListaCliente = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  constructor(private dialog: MatDialog,
    private clienteService: ClienteService,
    private utilidades: UtilidadesService) { }

  abrirFormulario(cliente?: Cliente): void {
    this.dialog
      .open(ModalClienteComponent, {
        disableClose: true,
        data: cliente,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) this.obtenerClientes();
      });
  }

  obtenerClientes() {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        if (data) {
          this.dataInicio = data;
          this.dataListaCliente.data = this.dataInicio;
        }
        else {
          this.utilidades.mostrarAlerta("No se encontraron datos", "Error!");
        }
      },
      error: (e) => { },
    });
  }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  ngAfterViewInit(): void {
    this.dataListaCliente.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaCliente.filter = filterValue.trim().toLowerCase();
  }

  eliminar(_cliente: Cliente) {
    Swal.fire({
      title: '¿Desea eliminar el cliente?',
      text: _cliente.nombre,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'No, volver',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Si, eliminar',
    }).then((resultado) => {
      if (!resultado.isConfirmed) {

        this.clienteService.eliminarCliente(_cliente.id ?? 0).subscribe({
          next: (res) => {
            this.utilidades.mostrarAlerta("El cliente fue eliminado", "Listo!");
            this.obtenerClientes();
          },
          error: (e) => { this.utilidades.mostrarAlerta("Error al eliminar el cliente", "Error!"); }
        })
      }
    });
  }

}
