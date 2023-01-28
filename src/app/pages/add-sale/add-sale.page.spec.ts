import { AppRoutingModule } from './../../app-routing.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { AddSalePage } from './add-sale.page';

describe('AddSalePage', () => {
  let component: AddSalePage;
  let fixture: ComponentFixture<AddSalePage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalePage ],
      imports: [IonicModule.forRoot(), AppRoutingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSalePage);
    router= TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should go to home on create new sale', () => {
    spyOn(router, 'navigate');

    component.addNewSaleButton();

    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });
});
