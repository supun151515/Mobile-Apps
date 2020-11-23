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
 //  user: Observable<any>;
  userToken$ = new BehaviorSubject(null);
  username$ = new BehaviorSubject(null);
  userData$ = new BehaviorSubject(null);
 // public displayUserData: any;
 // isLoggedIn: Observable<boolean>;

  constructor(private httpsService: HttpService,
              private storageService: StorageService,
              private router: Router) {

  // this.user = this.userToken$.asObservable();
               }



  async getUserData() {
      this.storageService.get(AuthConstants.AUTH).then(res => {
        this.userData$.next(res);
        // console.log(res);
        return res;
      });
    }

    login(postData: any): Observable<any> {
      return this.httpsService.post('login', postData, '');
    }

    logout(postData: any) {
      this.storageService.clear(AuthConstants.AUTH).then(res => {
        this.router.navigate(['']);
      });
      return this.httpsService.post('logout', postData, '');
    }

    Auth(value: any) {
          return this.httpsService.postData('auth', value);
    }
    customers(value: any) {
       return this.httpsService.postData('customers', value);
    }

    Agents(value: any) {
      return this.httpsService.postData('agents', value);
    }
    Clients(value: any) {
      return this.httpsService.postData('clients', value);
    }
    Users(value: any) {
      return this.httpsService.postData('users', value);
    }
    Cities() {
      return this.httpsService.getData('cities');
    }

    AccessLevels(data: any, token: any) {
      return this.httpsService.postData('accesslevels', token, data);
    }
    AccessLevelsSave(data: any, token: any) {
      return this.httpsService.postData('accesslevelssave', token, data);
    }

    addUsers(data: any, token: any) {
      return this.httpsService.postData('addUsers', token, data);
    }
    updateUsers(data: any, token: any) {
      return this.httpsService.postData('updateUsers', token, data);
    }
    deleteUser(data: any, token: any) {
      return this.httpsService.postData('deleteuser', token, data);
    }
    addAgent(data: any, token: any) {
      return this.httpsService.postData('addagent', token, data);
    }
    editAgent(data: any, token: any) {
      return this.httpsService.postData('editagent', token, data);
    }
    deleteAgent(data: any, token: any) {
      return this.httpsService.postData('deleteagent', token, data);
    }
    addClient(data: any, token: any) {
      return this.httpsService.postData('addclient', token, data);
    }
    editClient(data: any, token: any) {
      return this.httpsService.postData('editclient', token, data);
    }
    deleteClient(data: any, token: any) {
      return this.httpsService.postData('deleteclient', token, data);
    }

}
