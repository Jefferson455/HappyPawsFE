import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../../../services/cliente.service';

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Cliente } from '../../../models/cliente.model';
import { UtilidadesService } from '../../../services/utilidades.service';

@Component({
  standalone: true,
  selector: 'app-cliente-form',
  templateUrl: './modal-cliente.component.html',
  imports: [MatDialogModule, MatGridListModule, MatFormFieldModule,
    MatSelectModule, ReactiveFormsModule, RouterModule,
    MatInputModule, MatIconModule, MatButtonModule
  ],
  styleUrls: ['./modal-cliente.component.css']
})

export class ModalClienteComponent implements OnInit {
  formularioCliente: FormGroup;
  botonAccion: string = 'Guardar';
  tituloAccion: string = 'Agregar';
  private editar: Boolean = false;

  ocultarpassword: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<ModalClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public cliente: any,
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private utilidades: UtilidadesService
  ) {

    this.formularioCliente = this.fb.group({
      nombreCompleto: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }

  soloNumeros(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.formularioCliente.get('telefono')?.setValue(input.value);
  }
  cancelar() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.cliente != undefined) {
      this.editar = true;
      this.botonAccion = "Editar";
      this.tituloAccion = "Editar";
      this.formularioCliente.patchValue({
        nombreCompleto: this.cliente.nombre,
        telefono: this.cliente.telefono,
        direccion: this.cliente.direccion
      });
    } else {
      this.editar = false;
    }
  }

  guardar_Editar_Usuario() {
    const _cliente: Cliente = {
      nombre: this.formularioCliente.value.nombreCompleto,
      telefono: this.formularioCliente.value.telefono,
      direccion: this.formularioCliente.value.direccion
    };
    if (this.editar) {
      this.clienteService.actualizarCliente(this.cliente.id, _cliente).subscribe({
        next: (res) => {
          this.utilidades.mostrarAlerta('Cliente modificado correctamente.', 'Listo!')
          this.dialogRef.close(true);
        },
        error: (err) => {
          alert(err)
        }
      });
    } else {
      this.clienteService.crearCliente(_cliente).subscribe({
        next: (res) => {
          this.utilidades.mostrarAlerta('Cliente creado correctamente.', 'Listo!')
          this.dialogRef.close(true);
        },
        error: (err) => {
          alert(err)
        }
      });
    }
  }
}