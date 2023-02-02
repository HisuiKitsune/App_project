import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';


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

  constructor( private router: Router) { }

  ngOnInit() {}


  slidesDidLoad(slides: IonSlides): void {
    slides.startAutoplay();
  }

  goToCart() {
    this.router.navigate(['mycart']);
  }

}

