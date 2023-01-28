import { User } from './../../app/model/user/user';
import { recoverPassword, recoverPasswordSuccess, recoverPasswordFail, login, loginSuccess, loginFail } from './LoginActions';
import { loginReducer } from './login.reducers';
import { LoginState } from './LoginState';
import { AppInitialState } from '../AppInitialState';
describe("Login store", () =>{

  it('recoverPassword', () => {
    const initialState: LoginState = AppInitialState.login;

    const newState = loginReducer(initialState, recoverPassword({email: "any@email.com"}));
    expect(newState).toEqual({
      ...initialState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true
    })
  })

  it('recoverPasswordSuccess', () => {
    const initialState: LoginState = AppInitialState.login;

    const newState = loginReducer(initialState, recoverPasswordSuccess());
    expect(newState).toEqual({
      ...initialState,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false
    })
  })

  it('recoverPasswordFail', () => {
    const initialState: LoginState = AppInitialState.login;

    const error = {error: 'error'};
    const newState = loginReducer(initialState, recoverPasswordFail({error}));
    expect(newState).toEqual({
      ...initialState,
      error,
      isRecoveredPassword: false,
      isRecoveringPassword: false
    })
  })

  it('login', () => {
    const initialState: LoginState = AppInitialState.login;
    const newState = loginReducer(initialState, login({email: "valid@email.com", password: "anyPassword"}));
    expect(newState).toEqual({
      ...initialState,
      error: null,
      isLoggedIn: false,
      isLogginIn: true
    })
  })

  it('loginSuccess', () => {
    const initialState: LoginState = {
      ...AppInitialState.login,
      isLogginIn: true
    };

    const user = new User();
    user.id = "anyId";
    const newState = loginReducer(initialState, loginSuccess({user}));
    expect(newState).toEqual({
      ...initialState,
      isLoggedIn: true,
      isLogginIn: false
    })
  })

  it('loginFail', () => {
    const initialState: LoginState = {
      ...AppInitialState.login,
      isLogginIn: true
    };

    const error = {error: 'error'};

    const newState = loginReducer(initialState, loginFail({error}));
    expect(newState).toEqual({
      ...initialState,
      error,
      isLoggedIn: false,
      isLogginIn: false
    })
  })
})
