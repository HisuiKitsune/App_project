import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreFrontPageRoutingModule } from './store-front-routing.module';

import { StoreFrontPage } from './store-front.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreFrontPageRoutingModule
  ],
  declarations: [StoreFrontPage]
})
export class StoreFrontPageModule {}
