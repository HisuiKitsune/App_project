import { RegisterPageModule } from './register.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './../../app-routing.module';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterPage } from './register.page';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, RegisterPageModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    router = TestBed.inject(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should go to login page on register', () => {
    spyOn(router, 'navigate');

    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
