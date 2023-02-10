import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-termos',
  templateUrl: './termos.page.html',
  styleUrls: ['./termos.page.scss'],
})
export class TermosPage implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.swipeGesture(false);
  }


  ionViewWillLeave() {
    this.menuCtrl.toggle();

  }

}
