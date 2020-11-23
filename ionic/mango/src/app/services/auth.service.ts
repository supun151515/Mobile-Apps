import { AuthConstants } from './../config/auth-constants';
import { StorageService } from './storage.service';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData$ = new BehaviorSubject<any>('');

  constructor(private httpService: HttpService,
              private storageService: StorageService,
              private router: Router) { }

getUserData() {
  this.storageService.get(AuthConstants.AUTH).then(res => {
    // console.log(res);
    this.userData$.next(res);
  });
}

login(postData: any): Observable<any> {
  return this.httpService.post('login', postData);
}

signup(postData: any): Observable<any> {
  return this.httpService.post('signup', postData);
}

logout() {
  // this.storageService.clear();
  this.storageService.removeItem(AuthConstants.AUTH).then( res => {
    this.userData$.next('');
    this.router.navigate(['']);
  });
  // this.storageService.removeItem(AuthConstants.AUTH).then(res => {
  //  this.router.navigate(['']);
//  });
}
}
