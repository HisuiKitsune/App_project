import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-central-ajuda',
  templateUrl: './central-ajuda.page.html',
  styleUrls: ['./central-ajuda.page.scss'],
})
export class CentralAjudaPage implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.swipeGesture(false);

  }

  ionViewWillLeave() {
    this.menuCtrl.toggle();

  }

}
