import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoCondutaPageRoutingModule } from './codigo-conduta-routing.module';

import { CodigoCondutaPage } from './codigo-conduta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoCondutaPageRoutingModule
  ],
  declarations: [CodigoCondutaPage]
})
export class CodigoCondutaPageModule {}
