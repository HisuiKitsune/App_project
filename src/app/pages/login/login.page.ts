import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/store/AppState';

import { hide, show } from './../../../store/loading/loading.actions';
import { login, recoverPassword } from './../../../store/login/LoginActions';
import { LoginState } from './../../../store/login/LoginState';
import { LoginPageForm } from './login.page.form';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form!: FormGroup;
  loginStateSubscription!: Subscription;


  constructor(
    private router: Router,
    private formBuilder:FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController,
    private navController: NavController
    //private authService: AuthService
    ) { }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.store.select('login').subscribe(loginState => {
      this.onIsRecoveredPassword(loginState);
      //this.onIsRecoveringPassword(loginState);

      //this.onIsLogginIn(loginState);
      this.onIsLoggedIn(loginState);

      this.onError(loginState);
      this.toggleLoading(loginState);

    })
  }

  ngOnDestroy(): void {
    if(this.loginStateSubscription){
      this.loginStateSubscription.unsubscribe();
    }

  }

  private toggleLoading(loginState: LoginState){
    if(loginState.isLogginIn || loginState.isRecoveringPassword){
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onIsLoggedIn(loginState: LoginState){
    if (loginState.isLoggedIn){
      this.navController.navigateRoot('home');
    }
  }

  /*private onIsLogginIn(loginState: LoginState){
    if (loginState.isLogginIn){
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.authService.login(email, password).subscribe(user => {
        this.store.dispatch(loginSuccess({user}));
      }, error => {
        this.store.dispatch(loginFail({error}));
      })
    }
  }*/

  private async onError(loginState: LoginState){
    if (loginState.error){

      const toaster = await this.toastController.create({
        position: "bottom",
        message: loginState.error.message,
        color: "danger",
        duration: 5000,
      });
      toaster.present();
    }
  }

 /* private onIsRecoveringPassword(loginState: LoginState){
    if (loginState.isRecoveringPassword){


      this.authService.recoverEmailPassword(this.form.get('email')?.value).subscribe(() => {
        this.store.dispatch(recoverPasswordSuccess());
      }, error => {
        this.store.dispatch(recoverPasswordFail({error}))
      });
    }

  }*/

  private async onIsRecoveredPassword(loginState: LoginState){
    if (loginState.isRecoveredPassword){

      const toaster = await this.toastController.create({
        position: "bottom",
        message: "Recovery email sent",
        color: "primary",
        duration: 5000,
      });
      toaster.present();
    }

  }


  forgotEmailPassword(){
    this.store.dispatch(recoverPassword({email: this.form.get('email')?.value}));
  }

  login(){
    this.store.dispatch(login({email: this.form.get('email')?. value, password: this.form.get('password')?.value}));
  }

  register(){
    this.router.navigateByUrl("/register");
  }
}
