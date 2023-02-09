import { Auth } from '@angular/fire/auth';
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

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private firebaseFirestoreService: FirebaseFirestoreService,
    private dataServiceService: DataServiceService,
    private auth: Auth,
  ) {}

  ngOnInit() {
    this.dataServiceService.setDisplayName(this.auth.currentUser!.displayName!);
  }
  slidesDidLoad(slides: IonSlides): void {
    slides.startAutoplay();
  }

  goToCart() {
    this.router.navigate(['mycart']);
  }
}
