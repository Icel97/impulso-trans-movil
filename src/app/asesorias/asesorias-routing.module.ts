import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsesoriasPage } from './asesorias.page';

const routes: Routes = [
  {
    path: '',
    component: AsesoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsesoriasPageRoutingModule {}
