import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../../../services/cliente.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Cliente } from '../../../models/cliente.model';
import { UtilidadesService } from '../../../services/utilidades.service';
import { CommonModule } from '@angular/common';
import { Mascota } from '../../../models/mascota.model';
import { MascotaService } from '../../../services/mascota.service';

@Component({
  selector: 'app-modal-mascota',
  imports: [MatDialogModule, MatGridListModule, MatFormFieldModule,
    MatSelectModule, ReactiveFormsModule, RouterModule,
    MatInputModule, MatIconModule, MatButtonModule,
    MatDatepickerModule,CommonModule,MatAutocompleteModule],
  templateUrl: './modal-mascota.component.html',
  styleUrl: './modal-mascota.component.css'
})
export class ModalMascotaComponent implements OnInit {
  formularioMascota: FormGroup;
  botonAccion: string = 'Guardar';
  tituloAccion: string = 'Agregar';
  editar: Boolean = false;
  listaClientes: Cliente[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalMascotaComponent>,
    @Inject(MAT_DIALOG_DATA) public mascota: any,
    private fb: FormBuilder, 
    private clienteService: ClienteService,
    private mascotaServices: MascotaService,
    private utilidades: UtilidadesService
  ) {

    
    this.formularioMascota = this.fb.group({
      nombreMascota: ['', Validators.required],
      raza: ['', Validators.required],
      especie: ['', Validators.required],
      sexo: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      observaciones: ['', Validators.required],
      idCliente: ['', Validators.required]
    });

    this.clienteService.getClientes().subscribe({
      next: (data) => {
        if (data) {
          this.listaClientes = data;
          this.listaClientes.sort((a, b) => a.nombre.localeCompare(b.nombre));
        }
        else {
          this.utilidades.mostrarAlerta("No se encontraron datos", "Error!");
        }
      },
      error: (e) => { },
    });
  }


  ngOnInit(): void {
   if (this.mascota != undefined) {
      this.editar = true;
      this.botonAccion = "Editar";
      this.tituloAccion = "Editar";
      this.formularioMascota.patchValue({
        nombreMascota: this.mascota.nombre,
        raza: this.mascota.raza,
        especie: this.mascota.especie,
        sexo: this.mascota.sexo,
        fechaNacimiento: this.mascota.fechaNacimiento,
        observaciones: this.mascota.observaciones,
        idCliente:  this.mascota.cliente.id        
      });    
    } else {
      this.editar = false;
    }    
  }

  guardar_Editar() {
    const _mascota: Mascota = {
      nombre: this.formularioMascota.value.nombreMascota,
      raza: this.formularioMascota.value.raza,
      especie: this.formularioMascota.value.especie,
      sexo: this.formularioMascota.value.sexo,
      fechaNacimiento: this.formularioMascota.value.fechaNacimiento,
      observaciones: this.formularioMascota.value.observaciones,
      clienteId: this.formularioMascota.value.idCliente
    };
    
    if (this.editar) {
      _mascota.id=this.formularioMascota.value.id;
      this.mascotaServices.actualizarMascota(this.mascota.id, _mascota).subscribe({
        next: (res) => {
          this.utilidades.mostrarAlerta('Mascota modificada correctamente.', 'Listo!')
          this.dialogRef.close(true);
        },
        error: (err) => {
          alert(err)
        }
      });
    } else {
      this.mascotaServices.crearMascota(_mascota).subscribe({
        next: (res) => {
          this.utilidades.mostrarAlerta('Mascota creado correctamente.', 'Listo!')
          this.dialogRef.close(true);
        },
        error: (err) => {
          alert(err)
        }
      });
    }
  }
  cancelar() {
    this.dialogRef.close();
  }
}
