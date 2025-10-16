import { NgModule } from '@angular/core';

import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MegaMenuModule } from 'primeng/megamenu';
import { MegaMenu } from 'primeng/megamenu';


@NgModule({
  declarations: [],
  imports: [Toolbar, MegaMenu],
  exports: [Toolbar, AvatarModule, ButtonModule, ToolbarModule,MegaMenuModule, MegaMenu]
})
export class PrimengModule { }
