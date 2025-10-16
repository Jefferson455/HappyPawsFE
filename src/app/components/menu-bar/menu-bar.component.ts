import { Component } from '@angular/core';
import { PrimengModule } from '../../primeng/primeng.module';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  imports: [PrimengModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css',
})
export class MenuBarComponent {
  items: MegaMenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Huellitas Felices',
        icon: 'pi pi-list',
        items: [
          [
            {
              items: [
                { label: 'Mascotas',
                  icon: 'pi pi-bars',
                 },
                { label: 'Cliente',
                  icon: 'pi pi-users',
                },
                { label: 'Reporte',
                  icon: 'pi pi-file-export',
                 },
              ],
            },
          ],
        ],
      },
      {
        label: 'Electronics',
        icon: 'pi pi-mobile',
        items: [

        ],
      },
      {
        label: 'Sports',
        icon: 'pi pi-clock',
        items: [
        ],
      },
    ];
  }
}
