import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthConstants } from '../config/auth-constants';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData$ = new BehaviorSubject<any>('');
  public displayUserData: any;
  isLoggedIn: Observable<boolean>;
  constructor(private httpsService: HttpService,
              private storageService: StorageService,
              private router: Router
    ) { }

   getUserData() {
      this.storageService.get(AuthConstants.AUTH).then(res => {
        this.userData$.next(res);
        this.displayUserData = res;
      });
    }

    login(postData: any): Observable<any> {
      return this.httpsService.post('login', postData, '');
    }

    logout() {
      this.storageService.clear(AuthConstants.AUTH).then(res => {
         this.userData$.next('');
         this.router.navigate(['']);
      });
    }
    customers(value: any) {
       return this.httpsService.postData('customers', value);
    }

    Agents(value: any) {
      return this.httpsService.postData('agents', value);
    }

}
