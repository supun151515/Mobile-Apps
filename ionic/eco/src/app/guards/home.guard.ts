import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { Platform } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx/';
class Access {
name: string;
accessValue: string;
userType: string;
}
@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  userToken = null;
  information: any;
  accessName: Access[];
  public postData = {
    username: '',
    device_id: '',
    model: '',
    platform: []
  };
  constructor(private storageService: StorageService, private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private device: Device,
              private platform: Platform) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise(resolve => {
        this.storageService.get(AuthConstants.AUTH).then(res => {
          const myURL = state.url.substr(1);
          if (res) {
            res.dir = myURL;
            this.authService.userData$.next(res);
            this.authService.Auth(res).subscribe((data: any) => {
             if (data) { // invalid token
              this.storageService.clear(AuthConstants.AUTH);
              this.alertService.show('', '', 'You have no permission to access this page');
              resolve(false);
           //   this.router.navigate(['']);
             //  console.log('invalid token');
             } else {
              // console.log('safe Token');
             }
          },
          error => {
            this.storageService.clear(AuthConstants.AUTH);
            this.alertService.show('', '', 'You have no permission to access this page');
            resolve(false);
         //   this.router.navigate(['']);
          });

            if (res.user_type == '1') {
              resolve(true);
              return false;
            }
            this.accessName = JSON.parse(res.access_levels);
            const thisURL = this.accessName.filter(x => x.name == myURL);
            let accessData: string;
            if (thisURL[0].name === myURL) {
                    accessData = thisURL[0].accessValue;
                    const accessValue = accessData.split(',');
                    if (accessValue[0] === '1') {
                      resolve(true);
                    } else
                    if (accessValue[1] === '1') {
                      resolve(true);
                    } else {
                      this.alertService.show('', '', 'You have no permission to access this page');
                      resolve(false);
             //         this.router.navigate(['']);
                    }

                } else {
                  this.alertService.show('', '', 'You have no permission to access this page');
                  resolve(false);
             //     this.router.navigate(['']);
                }
          } else {
            console.log('error');
            this.alertService.show('', '', 'You have no permission to access this page');
            resolve(false);
            this.logout();
          //  this.router.navigate(['']);
          }
        }).catch(err => {
            this.alertService.show('', '', 'You have no permission to access this page');
            resolve(false);
            this.logout();
           // this.appComponent.logout();
        //    this.router.navigate(['']);
        });
    });
  }


  logout() {
    this.postData.device_id = this.device.uuid;
    if (this.postData.device_id == null) {
      this.postData.device_id = '';
    }
    this.postData.model = this.device.model;
    if (this.postData.model == null) {
      this.postData.model = '';
    }
    this.postData.platform = this.platform.platforms();
    this.postData.platform = this.postData.platform[0];
    this.authService.username$.subscribe(res => {
        this.postData.username = res;
    });
    this.authService.logout(this.postData).subscribe(res => {
         // console.log('ok');
    });
  }

}
