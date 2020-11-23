import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from './../config/auth-constants';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { LoadingService } from '../services/loading.service';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public postData = {
    username: '',
    password: '',
  };



  constructor(private router: Router,
              private authService: AuthService,
              private storageService: StorageService,
              private loadingService: LoadingService,
              private alertService: AlertService ) { }

  ngOnInit() {
  }

  validateInputs() {
    const username = this.postData.username.trim();
    const password = this.postData.password.trim();
    return (
      this.postData.username &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0
    );
  }

  loginAction() {
          this.loadingService.showLoader('Please wait');
          this.authService.login(this.postData).subscribe((res: any) => {
          this.loadingService.hideLoader();
          if (res.userData) {

          this.storageService.store(AuthConstants.AUTH, res.userData);
          this.router.navigate(['home']);
        } else {
          this.loadingService.hideLoader();
          this.alertService.show('', '', 'Invalid username or password');
        }
      },
      (error: any) => {
        this.loadingService.hideLoader();
        this.alertService.show('', '', 'Network connection error. Please check your internet settings');
      });
  }

}
