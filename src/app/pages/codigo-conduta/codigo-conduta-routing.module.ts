import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigoCondutaPage } from './codigo-conduta.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoCondutaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigoCondutaPageRoutingModule {}
