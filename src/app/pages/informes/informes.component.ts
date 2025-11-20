import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InformesService } from '../../services/informes.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatOptionModule } from '@angular/material/core';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-informes',
  imports: [MatOptionModule,MatButtonModule,ReactiveFormsModule,MatInputModule,MatFormFieldModule, FormsModule, 
    MatSelectModule, MatDatepickerModule, 
    MatNativeDateModule, MatTableModule,DatePipe, CommonModule],
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  filtroForm!: FormGroup;
  resultados: any[] = [];
  totalIngresos: number = 0;
  totalServicios: number = 0;

  constructor(
    private fb: FormBuilder,
    private informesService: InformesService
  ) {}

  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      fechaInicio: [''],
      fechaFin: [''],
      tipoServicio: ['todos']
    });
  }

  buscar() {
    const filtro = this.filtroForm.value;

    this.informesService.obtenerInforme(filtro).subscribe(res => {
      this.resultados = res;

      // Total ingresos
      this.totalIngresos = res.reduce((acc: number, x: any) => acc + x.precio, 0);

      // Total servicios
      this.totalServicios = res.length;
    });
  }
}
