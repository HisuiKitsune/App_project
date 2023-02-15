import { User, Auth, getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  status!: boolean;
  user!: User;
  imageUrl!: string;
  displayName!: string;
  email!: string;

  constructor(private dataServiceService: DataServiceService, private router: Router, private auth: Auth) { }

  ngOnInit() {
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
  goToLogin() {
    this.router.navigate(['login-page']);
  }
}
