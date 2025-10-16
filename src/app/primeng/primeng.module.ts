import { NgModule } from '@angular/core';

import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';


@NgModule({
  declarations: [],
  imports: [Toolbar],
  exports: [Toolbar, AvatarModule, ButtonModule, ToolbarModule]
})
export class PrimengModule { }
