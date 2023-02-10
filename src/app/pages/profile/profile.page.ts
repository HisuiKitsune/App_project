import { DataServiceService } from './../../services/data-service.service';
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
    private alertController: AlertController,
    private dataServiceService: DataServiceService
    ) {}

  ngOnInit(): void {

    if(this.auth.currentUser) {
      this.displayName = this.auth.currentUser?.displayName!;
      this.imageUrl = this.auth.currentUser?.photoURL!;
      this.email = this.auth.currentUser?.email!;
      this.dataServiceService.getDisplayName().subscribe(displayName=> this.displayName = displayName);
      this.dataServiceService.getEmail().subscribe(email=> this.email = email);
      this.dataServiceService.getPhoto().subscribe(imageUrl=> this.imageUrl = imageUrl);
      this.dataServiceService.setPhoto(this.auth.currentUser!.photoURL!);
      this.dataServiceService.setDisplayName(this.auth.currentUser!.displayName!);
      this.dataServiceService.setEmail(this.auth.currentUser!.email!);
    } else {
      this.router.navigate(['loader'], {replaceUrl: true});


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
    this.dataServiceService.setDisplayName(this.auth.currentUser!.displayName!);
  }

}

async changeImage(): Promise<void> {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Base64,
    source: CameraSource.Photos

  });

  if(image) {
    const loading = await this.loadingController.create();
    await loading.present();

    const result = await this.firestorageService.uploadPerfil(image, 'profiles', this.auth.currentUser!.uid);
    this.dataServiceService.setPhoto(this.auth.currentUser!.photoURL!);

    loading.dismiss();

    if(result) {
      this.message('Success', 'Success on save image');
      this.handleRefresh(true);
    } else {
      this.message('Fail', 'Ops! There was a problem');
    }

  }
}
  async signOut(): Promise<void> {
    await this.firebaseAuthenticationService.signOut();
    this.perfilFormGroup.reset();
    this.auth.currentUser?.reload();
    this.router.navigate(['loader'], {replaceUrl: true})
    .then(()=> setTimeout(()=> this.router.navigate(['store-front'], {replaceUrl: true}), 2000));
  }

  async message(header:string, message:string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Ok']
    });

    await alert.present();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.ngOnInit();
    }, 1000);
  };
}
