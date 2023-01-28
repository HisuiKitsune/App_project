import { createReducer, on } from '@ngrx/store';

import { AppInitialState } from './../AppInitialState';
import { login, recoverPassword, recoverPasswordFail, recoverPasswordSuccess, loginSuccess, loginFail } from './LoginActions';
import { LoginState } from './LoginState';

  const initialState: LoginState = AppInitialState.login;


const reducer = createReducer(initialState,
    on(recoverPassword, currentState => {
      return {
        ...currentState,
        error: null,
        isRecoveredPassword: false,
        isRecoveringPassword: true
      }
    }),
    on(recoverPasswordSuccess, currentState => {
      return {
        ...currentState,
        error: null,
        isRecoveredPassword: true,
        isRecoveringPassword: false
      }
    }),
    on(recoverPasswordFail, (currentState, action) => {
      return {
        ...currentState,
        error: action.error,
        isRecoveredPassword: false,
        isRecoveringPassword: false
      };
    }),

    on(login, currentState => {
      return{
        ...currentState,
        error: null,
        isLoggedIn: false,
        isLogginIn: true
      }
    }),
    on(loginSuccess, currentState => {
      return{
        ...currentState,
        isLoggedIn: true,
        isLogginIn: false
      }
    }),
    on(loginFail, (currentState, action) => {
      return{
        ...currentState,
        isLoggedIn: false,
        isLogginIn: false
      }
    })
  )


  export function loginReducer(state: LoginState, action: any){
    return reducer(state, action);
  }
