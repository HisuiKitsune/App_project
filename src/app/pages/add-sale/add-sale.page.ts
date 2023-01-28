import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.page.html',
  styleUrls: ['./add-sale.page.scss'],
})
export class AddSalePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addNewSaleButton() {
    this.router.navigate(['home']);
  }

}
