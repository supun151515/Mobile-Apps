import { Component, OnInit, ViewChild  } from '@angular/core';
import { AuthConstants } from './../config/auth-constants';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import {  IonInput, MenuController, NavController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx/';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('username', {  static: false })  inputElement: IonInput;
  public postData = {
    username: '',
    password: '',
    device_id: '',
    model: '',
    platform: []
  };
  mydate: any;

  constructor(private router: Router,
              private authService: AuthService,
              private storageService: StorageService,
              private loadingService: LoadingService,
              private alertService: AlertService,
              private menuCtrl: MenuController,
              private device: Device,
              public platform: Platform,
              private navController: NavController) {

              this.mydate = new Date().getFullYear();
              }

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.postData.password = '123';
    this.postData.username = 'supun';
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
    this.inputElement.setFocus();
  }
  ionViewDidLeave() {
    this.menuCtrl.enable(true);
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
    if (!this.validateInputs()) {
      return false;
    }
    this.loadingService.showLoader('Please wait');
    this.authService.login(this.postData).subscribe((res: any) => {
    this.loadingService.hideLoader();
    if (res.userData) {
    this.storageService.store(AuthConstants.AUTH, res.userData);
    this.authService.userData$.next(res.userData);
   // this.authService.userToken$.next(res.userData);
   // this.router.navigateByUrl('home');
  //  this.navController.navigateBack(['home']);

    window.location.reload();
  } else {
    // this.loadingService.hideLoader();
    this.alertService.show('', '', 'Invalid username or password');
  }
},
(error: any) => {
  // this.loadingService.hideLoader();
  this.alertService.show('', '', 'Network connection error. Please check your internet settings');
});
}
}
