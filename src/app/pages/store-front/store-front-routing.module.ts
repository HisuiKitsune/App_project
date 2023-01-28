import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreFrontPage } from './store-front.page';

const routes: Routes = [
  {
    path: '',
    component: StoreFrontPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreFrontPageRoutingModule {}
