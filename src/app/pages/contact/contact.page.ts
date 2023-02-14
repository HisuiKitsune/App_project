import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(private router:Router, private menuCtrl: MenuController) { }

  ngOnInit() {
  }

  backtoStore(){
    this.router.navigate(['store-front']);
  }

}
