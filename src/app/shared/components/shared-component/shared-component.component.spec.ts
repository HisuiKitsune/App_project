import { AppRoutingModule } from './../../../app-routing.module';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SharedComponentComponent } from './shared-component.component';

describe('SharedComponentComponent', () => {
  let component: SharedComponentComponent;
  let fixture: ComponentFixture<SharedComponentComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedComponentComponent ],
      imports: [IonicModule.forRoot(), AppRoutingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SharedComponentComponent);
    router= TestBed.inject(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should go to sales page on see details', () => {
    spyOn(router, 'navigate');

    component.goToSalesDetail();

    expect(router.navigate).toHaveBeenCalledWith(['sales']);
  });
});
