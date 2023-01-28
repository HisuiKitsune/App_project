
import { UserRegister } from './../../app/model/user/userRegister';
import { createAction, props } from '@ngrx/store';


export const register = createAction('[Register]', props<{userRegister: UserRegister}> ());
export const RegisterSuccess = createAction('[Register] success');
export const RegisterFail = createAction('[Register] fail', props<{error: any}>());;
