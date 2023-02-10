import { Component } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';

import { DataServiceService } from './services/data-service.service';
import { FirebaseAuthenticationService } from './services/firebase.authentication.service';

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

  public appPages = [];
  constructor(
    private menuCtrl: MenuController,
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
    this.router.navigate(['central-ajuda'])
  }
  goToTermos() {
    this.router.navigate(['termos'] )
  }
  goToPrivacidade() {
    this.router.navigate(['privacidade'] )
  }
  goToCodigoConduta() {
    this.router.navigate(['codigo-conduta'] )
  }
  ngOnInit() {
    this.dataServiceService.getDisplayName().subscribe(displayName=> this.displayName = displayName);
    this.dataServiceService.getEmail().subscribe(email=> this.email = email);
    this.dataServiceService.getPhoto().subscribe(imageUrl=> this.imageUrl = imageUrl);
  }


  async signOut(): Promise<void> {
    await this.firebaseAuthenticationService.signOut();
    this.router.navigate(['loader'], {replaceUrl: true})
    .then(()=> setTimeout(()=> this.router.navigate(['store-front']), 2000));
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

  handleRefresh() {
    this.ngOnInit();
  };
}
