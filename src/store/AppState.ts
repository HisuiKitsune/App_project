import { LoginState } from './login/LoginState';
import { LoadingState } from "./loading/LoadingState";
import { RegisterState } from './register/register.state';

export interface AppState {
  loading: LoadingState;
  login: LoginState;
  register: RegisterState;
}
