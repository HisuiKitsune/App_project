import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonInput, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { FirebaseService } from './../../services/firebase/firebase.service';
import { RegisterPageForm } from './form/register.page.form';



declare let google: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  @ViewChild('autocomplete') autocomplete!: IonInput;

  registerForm!: RegisterPageForm;
  registerStateSubscritpion!: Subscription;

  constructor(private formBuilder: FormBuilder,
    private toastController: ToastController, private firabaseService: FirebaseService){

  }

}
