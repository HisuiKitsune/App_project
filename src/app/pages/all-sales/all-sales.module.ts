import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../shared/shared.module';
import { AllSalesPageRoutingModule } from './all-sales-routing.module';
import { AllSalesPage } from './all-sales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllSalesPageRoutingModule,
    SharedModule
  ],
  declarations: [
    AllSalesPage
  ]
})
export class AllSalesPageModule {}
