import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService{

  private user = new BehaviorSubject<string>("Not Logged");
  constructor() {}

  setDisplayName(displayName: string) {
    this.user.next(displayName);
  }
  getDisplayName(): Observable<string>{
    return this.user.asObservable();

  }
}
