import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(token: string, userId: number) {

    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('token', token);

  }
  setCustomerId(customerId: number) {
    localStorage.setItem('customerId', customerId.toString());
  }
  getCustomerId() {
    var customerId = localStorage.getItem('customerId');
    var id: number = +customerId;
    return id;

  }
  setGroupItem(type: string) {
    localStorage.setItem('Group', type);

  }
  getGroupItem(): string {
    return localStorage.getItem('Group');
  }

  getTokenItem(): string {
    return localStorage.getItem('token');
  }
  getUserIdItem(): number {
    var userId = localStorage.getItem('userId');
    var id: number = +userId;
    return id;
  }

  signOut(){
    localStorage.removeItem('Group');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('customerId');



  }
}
