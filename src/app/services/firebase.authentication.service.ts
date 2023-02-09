import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
} from '@angular/fire/auth';
import firebase from 'firebase/compat/app';

import { CredentialModel } from '../model/user/credential.model';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {

  constructor(private auth: Auth) {}

  async register(user:CredentialModel): Promise<UserCredential | null> {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password)
    .then((credential:UserCredential) => {
      return credential;
    })
    .catch(error => {
      console.error(error);
      return null;
    });
  }

  async signIn(credential:CredentialModel): Promise<UserCredential | null> {
    return signInWithEmailAndPassword(this.auth, credential.email, credential.password)
    .then((user:UserCredential) => user)
    .catch(error => {
      console.error(error);
      return null;
    });
  }

  async updateProfile(displayName: string): Promise<void> {
    return updateProfile(this.auth.currentUser!, { displayName: displayName });
  }

  async signOut(): Promise<void> {
    return signOut(getAuth());
  }

  resetPasswordInit(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email)
  }
}
