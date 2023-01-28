import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ErrorMessageComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    ErrorMessageComponent
  ]
})
export class ErrorMessageModule { }
