import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSalePage } from './add-sale.page';

const routes: Routes = [
  {
    path: '',
    component: AddSalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSalePageRoutingModule {}
