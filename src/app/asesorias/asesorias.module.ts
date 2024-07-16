import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsesoriasPageRoutingModule } from './asesorias-routing.module';

import { AsesoriasPage } from './asesorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsesoriasPageRoutingModule
  ],
  declarations: [AsesoriasPage]
})
export class AsesoriasPageModule {}
