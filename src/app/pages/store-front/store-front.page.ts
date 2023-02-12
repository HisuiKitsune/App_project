import { Component, OnInit } from '@angular/core';
import { Auth, getAuth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { DataServiceService } from './../../services/data-service.service';

@Component({
  selector: 'app-store-front',
  templateUrl: './store-front.page.html',
  styleUrls: ['./store-front.page.scss'],
})
export class StoreFrontPage implements OnInit {
  slideOptions = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    autoHeight: true,
    autoplay: true,
  };

  user!: User;
  imageUrl!: string;
  displayName!: string;
  email!: string;
  status!: boolean;

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private dataServiceService: DataServiceService,
    private auth: Auth
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(true);
    this.getCurrentUser()
      .then((user: User | null) => {
        if (!user) {
          this.dataServiceService.setDisplayName('Not Logged');
          this.dataServiceService.setPhoto('../../../assets/img/avatar.png');
          this.dataServiceService.setEmail('skateclub@email.com');
          this.dataServiceService.setLogged(false);
        } else {
          this.displayName = user.displayName!;
          this.imageUrl = user.photoURL!;
          this.email = user.email!;
          this.dataServiceService
            .getDisplayName()
            .subscribe((displayName) => (this.displayName = displayName));
          this.dataServiceService
            .getEmail()
            .subscribe((email) => (this.email = email));
          this.dataServiceService
            .getPhoto()
            .subscribe((imageUrl) => (this.imageUrl = imageUrl));
          this.dataServiceService
            .getLogged()
            .subscribe((status) => (this.status = status));
          this.dataServiceService.setPhoto(user.photoURL!);
          this.dataServiceService.setDisplayName(user.displayName!);
          this.dataServiceService.setEmail(user.email!);
          this.dataServiceService.setLogged(true);
        }
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
  getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      const currentUser: User = getAuth().currentUser!;
      if (currentUser) resolve(currentUser);
      else {
        const unsubscribe = getAuth().onAuthStateChanged(
          (user: User | null) => {
            unsubscribe();
            resolve(user);
          },
          reject
        );
      }
    });
  };
  goToCart() {
    this.router.navigate(['mycart']);
  }
}
