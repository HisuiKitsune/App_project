import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacidade',
  templateUrl: './privacidade.page.html',
  styleUrls: ['./privacidade.page.scss'],
})
export class PrivacidadePage implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.swipeGesture(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.toggle();

  }

}
