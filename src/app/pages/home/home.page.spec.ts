import { AppRoutingModule } from './../../app-routing.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(), AppRoutingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    router = TestBed.inject(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should go to sales page on see details', () => {
    spyOn(router, 'navigate');

    component.goToSalesDetail();

    expect(router.navigate).toHaveBeenCalledWith(['sales']);
  });

  it('should go to add sale on create sale', () => {
    spyOn(router, 'navigate');

    component.newSale();

    expect(router.navigate).toHaveBeenCalledWith(['add-sale']);
  });
});
