import { Component } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { DataServiceService } from './services/data-service.service';
import { FirebaseAuthenticationService } from './services/firebase.authentication.service';
import { FirebaseStorageService } from './services/firebase.storage.service';

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
  logged: boolean = false;


  public appPages = [];
  constructor(
    private firebasestorageService: FirebaseStorageService,
    private firebaseAuthenticationService: FirebaseAuthenticationService,
    private auth: Auth,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private dataServiceService: DataServiceService
    ) {}

  goToStore() {
    this.router.navigate(['store-front'], {replaceUrl: true})
  }
  goToCentral() {
    this.router.navigate(['central-ajuda'], {replaceUrl: true})
  }
  goToTermos() {
    this.router.navigate(['termos'], {replaceUrl: true})
  }
  goToPrivacidade() {
    this.router.navigate(['privacidade'], {replaceUrl: true})
  }
  goToCodigoConduta() {
    this.router.navigate(['codigo-conduta'], {replaceUrl: true})
  }
  ngOnInit() {

    if(null != this.auth.currentUser) {
      this.logged = true;
    }

    if(null != this.auth.currentUser) {
      this.displayName = this.auth.currentUser.displayName!;
      this.imageUrl = this.auth.currentUser.photoURL!;
      this.email = this.auth.currentUser.email!;

    } else {
      this.imageUrl = "../assets/img/avatar.png";
      this.email = "skateclub@email.com";
      this.dataServiceService.getDisplayName().subscribe(displayName=> this.displayName = displayName);


    };



  }


  async signOut(): Promise<void> {
    await this.firebaseAuthenticationService.signOut();
    console.log("Error");
    this.router.navigate(['loader'], {replaceUrl: true})
    .then(() =>
    setTimeout(() => {this.router.navigate(['store-front'], {replaceUrl: true})}, 2000));
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
    if(null != getAuth().currentUser) {
    this.router.navigate(['profile'], { replaceUrl: true });
  }else {
    this.router.navigate(['login-page'], {replaceUrl: true})
  }

  }
}
