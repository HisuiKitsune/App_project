import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, doc, docData, DocumentData, Firestore, setDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

import { UserRegister } from '../model/user/userRegister';

@Injectable({
  providedIn: 'root',
})
export class FirebaseFirestoreService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  saveUser(user: UserRegister): Promise<void> {
    const document = doc(collection(this.firestore, 'users'));
    console.log(user);
    return setDoc(document, user);
  }

  list(): Observable<UserRegister[]> {
    const contactsCollection = collection(this.firestore, 'users');
    return collectionData(contactsCollection, { idField: 'id' }).pipe(
      map((result) => result as UserRegister[])
    );
  }

  findUser(): Observable<DocumentData> {
    const userId = this.auth.currentUser!.uid;
    const document = doc(this.firestore, `users/${userId}`);
    return docData(document);
  }

  updateUser(name: UserRegister): Promise<void> {
    const userId = this.auth.currentUser!.uid;
    const document = doc(this.firestore, 'users', userId);
    return setDoc(document, { name });
  }
}
