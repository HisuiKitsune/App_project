import { FirebaseFirestoreService } from './../../services/firebase.firestore.service';
import { getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { data } from 'jquery';


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
    autoplay: true
  };

  constructor( private router: Router,
                private firebaseFirestoreService: FirebaseFirestoreService) { }

  ngOnInit() {}

  ionViewDidLoad() {
    if(!getAuth().currentUser?.displayName) {

      this.firebaseFirestoreService.findPerfil().subscribe({
        next: (data) => console.log(data),
        error: (err) => console.error(err)
      })
      // next:(data) => getAuth().currentUser?.displayName = data
    }
  }


  slidesDidLoad(slides: IonSlides): void {
    slides.startAutoplay();
  }

  goToCart() {
    this.router.navigate(['mycart']);
  }

}

