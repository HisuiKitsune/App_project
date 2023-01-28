import { RegisterState } from './register.state';

import { AppInitialState } from './../AppInitialState';
import { createReducer, on } from '@ngrx/store';
import { register, RegisterSuccess, RegisterFail } from './register.actions';


const initialState =  AppInitialState.register;
const reducer = createReducer(initialState,
  on(register, state => {
    return {
      ...state,
      error: null,
      isRegistered: false,
      isRegistering: true
    }
  }),
  on(RegisterSuccess, state => {
    return {
      ...state,
      isRegistered: true,
      isRegistering: false
    }
  }),
  on(RegisterFail, (state, action) => {
    return {
      ...state,
      error: action.error,
      isRegistered: false,
      isRegistering: false
    }
  })
  );

export function registerReducer(state: RegisterState, action: any){
  return reducer(state,action);
}
