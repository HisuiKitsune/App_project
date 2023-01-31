import { AuthService } from 'src/app/services/auth/auth.service';
import { CredentialModel } from './../../model/user/credential.model';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, NavController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/store/AppState';

import { hide, show } from './../../../store/loading/loading.actions';
import { recoverPassword } from './../../../store/login/LoginActions';
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
  credentialFormGroup!:FormGroup;


  constructor(
    private router: Router,
    private formBuilder:FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController,
    private navController: NavController,
    private menu: MenuController,
    private firebaseAuthenticationService: AuthService,
    private alertController: AlertController
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

      this.credentialFormGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      });

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

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  forgotEmailPassword(){
    this.store.dispatch(recoverPassword({email: this.form.get('email')?.value}));
  }

  async login():Promise<void>{
    const user = await this.firebaseAuthenticationService.signIn(this.credentialFormGroup.getRawValue() as CredentialModel);
    if(user) {
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } else {
      this.showAlert('SignIn failed', 'Please try again!');
    }
  }

  async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Ok']
    });

    await alert.present();
  }


  register(){
    this.router.navigateByUrl("/register");
  }
}
