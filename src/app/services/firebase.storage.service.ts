import { Injectable } from '@angular/core';
import { getAuth, updateProfile } from '@angular/fire/auth';
import { doc, docData, DocumentData, Firestore, updateDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(private firestore: Firestore, private storage: Storage) {}

  getProfile(uuid: string) : Observable<DocumentData> {
    const perfilDocRef = doc(this.firestore, `users/${uuid}`);
    return docData(perfilDocRef);
  }

  async uploadPerfil(photo:Photo, collection:string, uuid:string): Promise<boolean> {
    const path = `uploads/${collection}/${uuid}/${new Date().getTime()}.png`;

    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, photo.base64String!, 'base64');
      const photoURL = await getDownloadURL(storageRef);

      const auth = getAuth();
      updateProfile(auth.currentUser!, { photoURL });

      return true;
    } catch (error) {
      return false;
    }
  }

}
