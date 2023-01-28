import { LoadingState } from './LoadingState';
import { createReducer, on } from "@ngrx/store";
import { show, hide } from "./loading.actions";

const initialState: LoadingState = {
  show: false
}

const reducer = createReducer({},
  on(show, () => {
    return {show: true};

  }),
  on(hide, () => {
    return {show: false};
  })
  );

  export function loadingReducer(state: LoadingState, action: any){
    return reducer(state, action);
  }
