import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  constructor(private router: Router, private menuCtrl:MenuController) { }

  ionViewDidEnter(): void {
    this.menuCtrl.swipeGesture(false);
  }

  ionViewDidLeave(): void {
    this.menuCtrl.swipeGesture(true);
  }

  ngOnInit() {
    setTimeout(() => {this.router.navigate([''])}, 2000)
  }
}

