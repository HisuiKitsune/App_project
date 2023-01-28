import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllSalesPage } from './all-sales.page';

const routes: Routes = [
  {
    path: '',
    component: AllSalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllSalesPageRoutingModule {}
