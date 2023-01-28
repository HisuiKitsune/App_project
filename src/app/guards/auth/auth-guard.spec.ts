import { Router, RouterModule } from '@angular/router';
import { loginSuccess } from './../../../store/login/LoginActions';
import { loginReducer } from 'src/store/login/login.reducers';
import { Store, StoreModule } from '@ngrx/store';

import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard';
import { AppState } from '@capacitor/app';
import { User } from 'src/app/model/user/user';

describe('AuthGuard', () => {

  let guard: AuthGuard;
  let store: Store<AppState>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        StoreModule.forRoot([]),
        StoreModule.forFeature('login', loginReducer)
      ]
    });
    guard = TestBed.inject(AuthGuard);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  });

  it('should allow logged user to acess page', () => {
    store.dispatch(loginSuccess({user: new User()}));

    guard.canMatch().subscribe(isAllowed => {
      expect(isAllowed).toBeTruthy();
    })
  });

  it('shoud not allow access to page if user is not logged in', () => {

    guard.canMatch().subscribe(isAllowed => {
      expect(isAllowed).toBeFalsy();
    })
  })

  it('should not allowed user be sent to the login page', () => {
    spyOn(router, 'navigateByUrl');

    guard.canMatch().subscribe(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('login');
    })
  })

});
