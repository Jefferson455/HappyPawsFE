import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { peluqueria } from '../../../models/peluqueria.model';
import { CommonModule } from '@angular/common';
import { GuarderiaService } from '../../../services/guarderia.service';
import { guarderia } from '../../../models/guarderia.model';


@Component({
  selector: 'app-modal-guarderia',
  imports: [MatDialogModule, MatGridListModule, MatFormFieldModule,
    MatSelectModule, ReactiveFormsModule, RouterModule,
    MatInputModule, MatIconModule, MatButtonModule, CommonModule, MatDatepickerModule
  ],
  templateUrl: './modal-guarderia.component.html',
  styleUrl: './modal-guarderia.component.css'
})
export class ModalGuarderiaComponent implements OnInit {
  formularioGuarderia: FormGroup;
  botonAccion: string = 'Guardar';
  tituloAccion: string = 'Agregar';
  private editar: Boolean = false;

  ocultarpassword: boolean = true;


  constructor(
    public dialogRef: MatDialogRef<ModalGuarderiaComponent>,
    @Inject(MAT_DIALOG_DATA) public guarderia: any,
    private fb: FormBuilder,
    private guarderiaService: GuarderiaService,
    private utilidades: UtilidadesService
  ) {
    this.formularioGuarderia = this.fb.group({
      fechaSalida: ['', Validators.required],
      hora: ['', Validators.required],
      precio: ['', Validators.required],
      abono: ['', Validators.required],
      saldo: [{ value: '', disabled: true }],
      formaPago: ['', Validators.required],
      observaciones: ['', Validators.required],
      mascotaId: [0, Validators.required]
    });
  }
  actualizarSaldo() {
    const precioStr = this.formularioGuarderia.get('precio')?.value || '0';
    const abonoStr = this.formularioGuarderia.get('abono')?.value || '0';

    const precio = Number(precioStr.toString().replace(/\./g, '')) || 0;
    const abono = Number(abonoStr.toString().replace(/\./g, '')) || 0;

    if (abono > precio) {
      this.formularioGuarderia.get('abono')?.setErrors({ abonoMayor: true });
    } else {
      this.formularioGuarderia.get('abono')?.setErrors(null);
    }

    const saldo = precio - abono;
    this.formularioGuarderia.get('saldo')?.setValue(
      saldo >= 0 ? saldo.toLocaleString('es-CO') : '0',
      { emitEvent: false }
    );
  }

  soloNumeros(event: any, controlName: string) {
    const input = event.target as HTMLInputElement;
    let valorLimpio = input.value.replace(/[^0-9]/g, '');
    this.formularioGuarderia.get(controlName)?.setValue(valorLimpio, { emitEvent: true });
    input.value = valorLimpio ? Number(valorLimpio).toLocaleString('es-CO') : '';
  }

  cancelar() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.formularioGuarderia.get('precio')?.valueChanges.subscribe(() => this.actualizarSaldo());
    this.formularioGuarderia.get('abono')?.valueChanges.subscribe(() => this.actualizarSaldo());
    if (this.guarderia.id != undefined) {
      console.log(this.guarderia)
      this.editar = true;
      this.botonAccion = "Editar";
      this.tituloAccion = "Editar";
      this.formularioGuarderia.patchValue({
        fechaSalida: this.guarderia.fechaSalida,
        hora: this.guarderia.fechaSalida
          ? new Date(this.guarderia.fechaSalida).toTimeString().slice(0, 5) // "HH:mm"
          : '',
        precio: Number(this.guarderia.precio).toLocaleString('es-CO'),
        abono: Number(this.guarderia.abono).toLocaleString('es-CO'),
        saldo: Number(this.guarderia.precio - this.guarderia.abono).toLocaleString('es-CO'),
        formaPago: this.guarderia.formaPago,
        observaciones: this.guarderia.observaciones,
        mascotaId: this.guarderia.mascotaId
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
    const precio = Number((this.formularioGuarderia.value.precio || '0').toString().replace(/\./g, ''));
    const abono = Number((this.formularioGuarderia.value.abono || '0').toString().replace(/\./g, ''));

    const fechaString = this.formularioGuarderia.get('fechaSalida')?.value; // "2025-08-16T05:00:00"
    const hora = this.formularioGuarderia.get('hora')?.value;               // "14:30" (ejemplo

    const fecha = new Date(fechaString); // convertir string a Date

    const [hours, minutes] = hora.split(':');
    fecha.setHours(+hours-hours, +minutes, 0, 0);

    console.log("Fecha final:", fecha); // objeto Date con fecha + hora actualizada



    const _guarderia: guarderia = {
      precio,
      fechaSalida: fecha,
      abono,
      formaPago: this.formularioGuarderia.value.formaPago,
      observaciones: this.formularioGuarderia.value.observaciones,
      mascotaId: this.guarderia.mascotaId
    };
    if (this.editar) {
      console.log(_guarderia);
      this.guarderiaService.actualizarGuarderia(this.guarderia.id, _guarderia).subscribe({
        next: (res) => {
          this.utilidades.mostrarAlerta('Servicio de guarderia modificado correctamente.', 'Listo!')
          this.dialogRef.close(true);
        },
        error: (err) => {
          alert(err)
        }
      });
    } else {
      this.guarderiaService.crearGuarderia(_guarderia).subscribe({
        next: (res) => {
          this.utilidades.mostrarAlerta('Servicio de guarderia creado correctamente.', 'Listo!')
          this.dialogRef.close(true);
        },
        error: (err) => {
          alert(err)
        }
      });
    }
  }
}
