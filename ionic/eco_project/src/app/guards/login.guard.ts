import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise(resolve => {
        this.storageService.get(AuthConstants.AUTH).then(res => {
          if (res) {
            // console.log('ok - ');
            resolve(false);
            this.router.navigate(['home']);
          } else {
            // console.log('error');
            resolve(true);
            // this.router.navigate(['login']);
          }
        }).catch(err => {
          resolve(false);
        });
    });
  }

}

