import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService{

  private user = new BehaviorSubject<string>('');
  private photo = new BehaviorSubject<string>(`../../assets/img/avatar.png`);
  private email = new BehaviorSubject<string>('');
  constructor() {}

  setDisplayName(displayName: string) {
    this.user.next(displayName);
  }
  getDisplayName(): Observable<string>{
    return this.user.asObservable();
  }
  setPhoto(imageUrl: string) {
    this.photo.next(imageUrl);
  }
  getPhoto(): Observable<string>{
    return this.photo.asObservable();
  }
  setEmail(email: string) {
    this.email.next(email);
  }
  getEmail(): Observable<string>{
    return this.email.asObservable();
  }
}
