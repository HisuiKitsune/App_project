import { FirebaseStorageService } from './services/firebase.storage.service';
import { Component, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';

import { FirebaseAuthenticationService } from './services/firebase.authentication.service';
import { FirebaseFirestoreService } from './services/firebase.firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  imageUrl!:string;
  displayName!:string;
  email!: string;
  menu!: HTMLIonMenuElement;

  perfilFormGroup!: FormGroup;
  @ViewChild('perfilFormGroupDirective')
  perfilFormGroupDirective!: FormGroupDirective;

  public appPages = [];
  constructor(private firebaseFirestoreService: FirebaseFirestoreService,
    private firebasestorageService: FirebaseStorageService,
    private firebaseAuthenticationService: FirebaseAuthenticationService,
    private auth: Auth,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController) {}


  goToLoginPage() {
    this.router.navigate(['login-page'])
  }

  goToStore() {
    this.router.navigate(['store-front'])
  }

  goToCentral() {
    this.router.navigate(['central-ajuda'])
  }
  goToTermos() {
    this.router.navigate(['termos'])
  }
  goToPrivacidade() {
    this.router.navigate(['privacidade'])
  }
  goToCodigoConduta() {
    this.router.navigate(['codigo-conduta'])
}


  ngOnInit() {
    console.log("display name = " + this.displayName);


    if(this.auth.currentUser) {
      this.displayName = this.auth.currentUser!.displayName!;
      this.imageUrl = this.auth.currentUser!.photoURL!;
      this.email = this.auth.currentUser!.email!;


   /* this.perfilFormGroup = new FormGroup({
      name: new FormControl(this.auth.currentUser!.displayName, Validators.required),
      email: new FormControl(this.auth.currentUser!.email, Validators.required)
    });*/

    } else {
      this.displayName = "Not Logged";
      this.imageUrl = "../assets/img/avatar.png";

    };




  }

async update(): Promise<void> {
  const name:string = this.perfilFormGroup.get('name')?.value;
  this.firebaseAuthenticationService.updateProfile(name);
}

async changeImage(): Promise<void> {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Base64,
    source: CameraSource.Photos
  });


  if(image) {
    const loading = await this.loadingController.create();
    await loading.present();

    const result = await this.firebasestorageService.uploadPeril(image, 'perfils', this.auth.currentUser!.uid);

    loading.dismiss();

    if(result) {
      this.message('Success', 'Success on save image');
    } else {
      this.message('Fail', 'Ops! There was a problem');
    }
  }
}

  async signOut(): Promise<void> {
    await this.firebaseAuthenticationService.signOut();
    console.log("Error");
    this.router.navigate(['loader'])
    .then(() =>
    setTimeout(() => {this.router.navigate(['store-front'])}, 2000));
  }

  async message(header:string, message:string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Ok']
    });

    await alert.present();
  }

  async perfil() {
    this.router.navigateByUrl('/register', { replaceUrl: true });
  }
}
