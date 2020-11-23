import { StorageService } from './../../services/storage.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from './../../config/auth-constants';
import { ToastService } from '../../services/toast.service';
import { tokenName } from '@angular/compiler';


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
              private toastService: ToastService) { }

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
    if (this.validateInputs()) {
      this.authService.login(this.postData).subscribe((res: any) => {
        if (res.userData) {
          this.storageService.store(AuthConstants.AUTH, res.userData);
          this.router.navigate(['home/feed']);
          // this.toastService.presentToast('ok');
        } else {
          this.toastService.presentToast('Incorrect username or password');
        }
      },
        (error: any) => {
          this.toastService.presentToast(JSON.stringify(error));
        }
      );
    }
  }


  /*
  Test() {
    this.http.get('http://slim3.extremeits.biz/public/api/customers', {}, {})
  .then(data => {

    console.log(data.status);
    console.log(data.data); // data received by server
    console.log(data.headers);

  })
  .catch(error => {

    console.log(error.status);
    console.log(error.error); // error message as string
    console.log(error.headers);

  });
  }
  */



}
