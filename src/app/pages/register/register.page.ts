import { FirebaseService } from './../../services/firebase/firebase.service';
import { User } from 'src/app/model/user/user';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonInput, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';
import { RegisterState } from 'src/store/register/register.state';

import { login } from './../../../store/login/LoginActions';
import { register } from './../../../store/register/register.actions';
import { RegisterPageForm } from './form/register.page.form';

declare let google: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {

  @ViewChild('autocomplete') autocomplete!: IonInput;

  registerForm!: RegisterPageForm;
  registerStateSubscritpion!: Subscription;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>,
    private toastController: ToastController, private firabaseService: FirebaseService){

  }

  ngOnInit() {
   this.watchRegisterState();
    this.createForm();
  }
  ngOnDestroy(): void {
    this.registerStateSubscritpion.unsubscribe();
  }

  ionViewDidEnter() {
    this.autocomplete.getInputElement().then((ref: any) => {
      const autocomplete = new google.maps.places.Autocomplete(ref);
      autocomplete.addListener('place_changed', () => {
        this.registerForm.setAddress(autocomplete.getPlace())
      })
    })
  }

  register(){
    this.registerForm.getForm().markAllAsTouched();
    if (this.registerForm.getForm().valid) {
      this.store.dispatch(register({userRegister: this.registerForm.getForm().value}));
    }
    this.addUser(User);
  }
  private createForm() {
    this.registerForm = new RegisterPageForm(this.formBuilder);
  }

  private watchRegisterState() {

    this.registerStateSubscritpion = this.store.select('register').subscribe(state => {
      this.toggleLoading(state);

      this.onRegistered(state);
      this.onError(state);

    })
  }

  private onError(state: RegisterState){
    if(state.error){
      this.toastController.create({
        message: state.error.message,
        duration: 5000,
        header: 'Registration not finished',
        color: 'light',
      }).then(toast => toast.present());
    }
  }

  private onRegistered(state:  RegisterState){
    if(state.isRegistered){
      this.store.dispatch(login({
        email: this.registerForm.getForm()?.value.email,
        password: this.registerForm.getForm()?.value.password
      }))
    }
  }

  private toggleLoading(state: RegisterState) {
    if (state.isRegistering){
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  addUser(values: any) {
    let newUser:User = {...values};
    this.firabaseService.save(newUser);
  }
}
