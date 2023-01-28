import { Injectable } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  save(user: User): Promise<void> {
    const document = doc (collection(this.firestore, 'User'));
    return setDoc(document, user)
  }

}
