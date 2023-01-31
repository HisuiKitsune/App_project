import { Injectable } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { CredentialModel } from 'src/app/model/user/credential.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  save(user: CredentialModel): Promise<void> {
    const document = doc (collection(this.firestore, 'User'));
    return setDoc(document, user)
  }

}
