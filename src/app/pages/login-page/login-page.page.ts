import { Auth } from '@angular/fire/auth';
import { DataServiceService } from './../../services/data-service.service';
import { FirebaseAuthenticationService } from './../../services/firebase.authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, } from '@ionic/angular';
import { CredentialModel } from 'src/app/model/user/credential.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  credentialFormGroup!:FormGroup;
  displayName!: string;

  constructor(
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private firebaseAuthenticationService: FirebaseAuthenticationService,
    private router: Router,
    private alertController: AlertController,
    private dataServiceService: DataServiceService,
    private auth: Auth,

  ) {}

  ionViewDidEnter(): void {
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave(): void {
    this.menuCtrl.enable(true);
  }
  goToRegisterPage() {
    this.router.navigate(['register'], {replaceUrl: true})
  }
  goToStore() {
    this.router.navigate(['store-front'], {replaceUrl: true})
  }
  ngOnInit() {
    this.credentialFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  async signIn(): Promise<void> {
    const user = await this.firebaseAuthenticationService.signIn(this.credentialFormGroup.getRawValue() as CredentialModel);

    if(user) {
      this.dataServiceService.setDisplayName(this.auth.currentUser!.displayName!);
      this.dataServiceService.setEmail(this.auth.currentUser!.email!);
      this.dataServiceService.setPhoto(this.auth.currentUser!.photoURL!);
      this.dataServiceService.setLogged(true);

      this.router.navigate(['loader'], { replaceUrl: true })
      .then(()=> setTimeout(()=>this.router.navigate(['profile']), 2000));
    } else {
      this.showAlert('Sign-In failed', 'E-mail and/or password is wrong or does not exist');
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

  async resetPassword(): Promise<void>{
    this.firebaseAuthenticationService.resetPasswordInit(this.credentialFormGroup.value.email)
    .then(
      async () => {
        this.showAlert('Recovery e-mail sent!', 'Check your e-mail inbox');

      },
     async error => {
      this.showAlert('Error', 'An error ocurred, please try again');
     });

  }
}
