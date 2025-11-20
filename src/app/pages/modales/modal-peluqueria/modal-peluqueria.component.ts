import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UtilidadesService } from '../../../services/utilidades.service';
import { PeluqueriaService } from '../../../services/peluqueria.service';
import { peluqueria } from '../../../models/peluqueria.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-peluqueria',
  imports: [MatDialogModule, MatGridListModule, MatFormFieldModule,
    MatSelectModule, ReactiveFormsModule, RouterModule,
    MatInputModule, MatIconModule, MatButtonModule, CommonModule
  ],
  templateUrl: './modal-peluqueria.component.html',
  styleUrl: './modal-peluqueria.component.css'
})
export class ModalPeluqueriaComponent implements OnInit {
  formularioPeluqueria: FormGroup;
  botonAccion: string = 'Guardar';
  tituloAccion: string = 'Agregar';
  private editar: Boolean = false;

  ocultarpassword: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<ModalPeluqueriaComponent>,
    @Inject(MAT_DIALOG_DATA) public peluqueria: any,
    private fb: FormBuilder,
    private peluqueriaService: PeluqueriaService,
    private utilidades: UtilidadesService
  ) {
    this.formularioPeluqueria = this.fb.group({
      precio: ['', Validators.required],
      abono: ['', Validators.required],
      saldo: [{ value: '', disabled: true }],
      formaPago: ['', Validators.required],
      observaciones: ['', Validators.required],
      mascotaId: [0, Validators.required]
    });
  }
  actualizarSaldo() {
    const precioStr = this.formularioPeluqueria.get('precio')?.value || '0';
    const abonoStr = this.formularioPeluqueria.get('abono')?.value || '0';

    const precio = Number(precioStr.toString().replace(/\./g, '')) || 0;
    const abono = Number(abonoStr.toString().replace(/\./g, '')) || 0;

    if (abono > precio) {
      this.formularioPeluqueria.get('abono')?.setErrors({ abonoMayor: true });
    } else {
      this.formularioPeluqueria.get('abono')?.setErrors(null);
    }

    const saldo = precio - abono;
    this.formularioPeluqueria.get('saldo')?.setValue(
      saldo >= 0 ? saldo.toLocaleString('es-CO') : '0',
      { emitEvent: false }
    );
  }

  soloNumeros(event: any, controlName: string) {
    const input = event.target as HTMLInputElement;
    let valorLimpio = input.value.replace(/[^0-9]/g, '');
    this.formularioPeluqueria.get(controlName)?.setValue(valorLimpio, { emitEvent: true });
    input.value = valorLimpio ? Number(valorLimpio).toLocaleString('es-CO') : '';
  }

  cancelar() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.formularioPeluqueria.get('precio')?.valueChanges.subscribe(() => this.actualizarSaldo());
    this.formularioPeluqueria.get('abono')?.valueChanges.subscribe(() => this.actualizarSaldo());
    if (this.peluqueria.id != undefined) {
      this.editar = true;
      this.botonAccion = "Editar";
      this.tituloAccion = "Editar";
      this.formularioPeluqueria.patchValue({
        precio: Number(this.peluqueria.precio).toLocaleString('es-CO'),
        abono: Number(this.peluqueria.abono).toLocaleString('es-CO'),
        saldo: Number(this.peluqueria.precio - this.peluqueria.abono).toLocaleString('es-CO'),
        formaPago: this.peluqueria.formaPago,
        observaciones: this.peluqueria.observaciones,
        mascotaId: this.peluqueria.mascotaId
      });
setTimeout(() => {
    const precioInput = document.querySelector<HTMLInputElement>('input[formControlName="precio"]');
    const abonoInput = document.querySelector<HTMLInputElement>('input[formControlName="abono"]');
    if (precioInput) this.soloNumeros({ target: precioInput }, 'precio');
    if (abonoInput) this.soloNumeros({ target: abonoInput }, 'abono');
  });
    } else {
      this.editar = false;
    }
  }


  guardar_Editar_Usuario() {
    const precio = Number((this.formularioPeluqueria.value.precio || '0').toString().replace(/\./g, ''));
    const abono = Number((this.formularioPeluqueria.value.abono || '0').toString().replace(/\./g, ''));

    const _peluqueria: peluqueria = {
      precio,
      fecha: this.peluqueria.fecha,
      abono,
      formaPago: this.formularioPeluqueria.value.formaPago,
      observaciones: this.formularioPeluqueria.value.observaciones,
      mascotaId: this.peluqueria.mascotaId
    };

    console.log(_peluqueria)
    if (this.editar) {
      this.peluqueriaService.actualizarPeluqueria(this.peluqueria.id, _peluqueria).subscribe({
        next: (res) => {
          this.utilidades.mostrarAlerta('Servicio de peluqueria modificado correctamente.', 'Listo!')
          this.dialogRef.close(true);
        },
        error: (err) => {
          alert(err)
        }
      });
    } else {
      this.peluqueriaService.crearPeluqueria(_peluqueria).subscribe({
        next: (res) => {
          this.utilidades.mostrarAlerta('Servicio de peluqueria creado correctamente.', 'Listo!')
          this.dialogRef.close(true);
        },
        error: (err) => {
          alert(err)
        }
      });
    }
  }
}