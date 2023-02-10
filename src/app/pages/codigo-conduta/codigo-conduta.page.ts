import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-codigo-conduta',
  templateUrl: './codigo-conduta.page.html',
  styleUrls: ['./codigo-conduta.page.scss'],
})
export class CodigoCondutaPage implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.swipeGesture(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.toggle();

  }

}
