import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menu!: HTMLIonMenuElement

  public appPages = [];
  constructor(private router: Router) {}

  goToLoginPage() {
    this.router.navigate(['login-page'])
  }

  goToStore() {
    this.router.navigate(['store-front'])
  }
}
