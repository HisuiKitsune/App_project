import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, UserCredential, getAuth } from '@angular/fire/auth';
import { CredentialModel } from '../model/user/credential.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {

  constructor(private auth: Auth) {}

  async register(credential:CredentialModel): Promise<UserCredential | null> {
    console.log(credential)
    return createUserWithEmailAndPassword(this.auth, credential.email, credential.password)
    .then((credential:UserCredential) => {
      // persistencia dos dados name, email
      console.log(credential)
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

  async updateProfile(displayName:string): Promise<void> {
    return updateProfile(this.auth.currentUser!, { displayName: displayName });
  }

  async signOut(): Promise<void> {
    return signOut(getAuth());
  }

  resetPasswordInit(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email)
  }
}
