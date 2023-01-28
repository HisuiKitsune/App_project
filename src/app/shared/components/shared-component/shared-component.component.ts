import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-component',
  templateUrl: './shared-component.component.html',
  styleUrls: ['./shared-component.component.scss'],
})
export class SharedComponentComponent implements OnInit {
@Input() hasHeader!: boolean;
@Input() hasFooter!: boolean;

@Input() product!: string;
@Input() brand!: string;
@Input() soldAt!: string;
@Input() notes!: string;
@Input() price!: string;




  constructor(private router: Router) { }

  ngOnInit() {}

  goToSalesDetail() {
    this.router.navigate(['sales']);
  }


}
