import { Routes } from '@angular/router';
import { PeluqueriaComponent } from './pages/peluqueria/peluqueria.component';
import { GuarderiaComponent } from './pages/guarderia/guarderia.component';
import { InformesComponent } from './pages/informes/informes.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { DetallesComponent } from './pages/detalles/detalles.component';

export const routes: Routes =  [
    { path: 'peluqueria', component: PeluqueriaComponent },
    { path: 'guarderia', component: GuarderiaComponent },
    { path: 'informes', component: InformesComponent },
    { path: 'Mascotas', component: MascotasComponent },
    { path: 'clientes', component: ClientesComponent },     
    { path: 'detalles/:id', component: DetallesComponent }
  ];