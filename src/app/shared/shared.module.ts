
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SharedComponentComponent } from './components/shared-component/shared-component.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [SharedComponentComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports:[
    SharedComponentComponent
  ]
})
export class SharedModule { }
