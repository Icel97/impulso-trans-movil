import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsesoriasPageRoutingModule } from './asesorias-routing.module';

import { AsesoriasPage } from './asesorias.page';
import { ComponentsModule } from "../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsesoriasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AsesoriasPage]
})
export class AsesoriasPageModule {}
