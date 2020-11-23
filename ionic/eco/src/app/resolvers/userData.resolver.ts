import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthConstants } from '../config/auth-constants';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Injectable({
    providedIn: 'root'
})

export class UserDataResolver implements Resolve<any> {
    // userData$ = new BehaviorSubject<any>('');
    myToken: any;
  //  myData: Token;
    constructor(private storageService: StorageService,
                private authService: AuthService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot) {
      //  this.myToken = [];
       // this.myToken.dir = 'ddd';
        this.myToken = this.storageService.get(AuthConstants.AUTH);
       // this.authService.userToken$.next(this.myToken)
        return this.myToken;
    }
}
