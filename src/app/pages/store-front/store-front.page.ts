import { Auth, getAuth } from '@angular/fire/auth';
import { DataServiceService } from './../../services/data-service.service';
import { FirebaseFirestoreService } from './../../services/firebase.firestore.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IonSlides, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-store-front',
  templateUrl: './store-front.page.html',
  styleUrls: ['./store-front.page.scss'],
})
export class StoreFrontPage implements OnInit {
  slider: any;
  slideOptions = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    autoHeight: true,
    autoplay: true,
  };

  imageUrl!:string;
  displayName!:string;
  email!: string;

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private firebaseFirestoreService: FirebaseFirestoreService,
    private dataServiceService: DataServiceService,
    private auth: Auth,
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(true);
    if(!getAuth().currentUser){
      this.dataServiceService.setDisplayName("Not Logged");
      this.dataServiceService.setPhoto('../../../assets/img/avatar.png');
      this.dataServiceService.setEmail('skateclub@email.com');
    } else {
      this.displayName = this.auth.currentUser?.displayName!;
      this.imageUrl = this.auth.currentUser?.photoURL!;
      this.email = this.auth.currentUser?.email!;
      this.dataServiceService.getDisplayName().subscribe(displayName=> this.displayName = displayName);
      this.dataServiceService.getEmail().subscribe(email=> this.email = email);
      this.dataServiceService.getPhoto().subscribe(imageUrl=> this.imageUrl = imageUrl);
      this.dataServiceService.setPhoto(this.auth.currentUser!.photoURL!);
      this.dataServiceService.setDisplayName(this.auth.currentUser!.displayName!);
      this.dataServiceService.setEmail(this.auth.currentUser!.email!);
    }
  }
  slidesDidLoad(slides: IonSlides): void {
    slides.startAutoplay();
  }

  goToCart() {
    this.router.navigate(['mycart']);
  }
}
