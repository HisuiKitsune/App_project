import { FirebaseStorageService } from './../../services/firebase.storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoadingController, AlertController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { FirebaseAuthenticationService } from 'src/app/services/firebase.authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  imageUrl!:string;
  displayName!:string;
  email!: string;

  perfilFormGroup!: FormGroup;
  @ViewChild('perfilFormGroupDirective')
  perfilFormGroupDirective!: FormGroupDirective;

  constructor(
    private firestorageService: FirebaseStorageService,
    private firebaseAuthenticationService: FirebaseAuthenticationService,
    private auth: Auth,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController) {}

  ngOnInit() {

    if(this.auth.currentUser) {
      this.displayName = this.auth.currentUser.displayName!;
      this.imageUrl = this.auth.currentUser.photoURL!;
      this.email = this.auth.currentUser.email!;

    } else {
      this.router.navigate(['login-page']);

    };

    this.perfilFormGroup = new FormGroup({
      name: new FormControl(this.auth.currentUser!.displayName, Validators.required),
      email: new FormControl(this.auth.currentUser!.email, Validators.required)
    });
  }

async update(): Promise<void> {
  const name:string = this.perfilFormGroup.get('name')?.value;
  if(name) {
    const loading = await this.loadingController.create();
    await loading.present();

    await this.firebaseAuthenticationService.updateProfile(name)
    loading.dismiss();
    await this.message('Sucess', 'Changes have been updated');
    this.router.navigate(['profile'], {replaceUrl: true})
  }

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

    const result = await this.firestorageService.uploadPerfil(image, 'profiles', this.auth.currentUser!.uid);

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
    this.router.navigate(['store-front'], { replaceUrl: true });
  }

  async message(header:string, message:string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Ok']
    });

    await alert.present();
  }
}
