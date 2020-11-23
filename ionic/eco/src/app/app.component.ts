import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Device } from '@ionic-native/device/ngx/';
import { StorageService } from './services/storage.service';
import { AuthConstants } from './config/auth-constants';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  userData = null;
  fullName: '';
  region: '';
  mobile1: '';
  mobile2: '';
  email: '';
  userText: '';
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      access: ''
    },
    {
      title: 'Registration',
      url: '',
      icon: 'person',
      access: '',
      subPages: [
        {
        title: 'Agents',
        url: '/agents',
        icon: 'contacts',
        access: ''
        },
        {
        title: 'Clients',
        url: '/clients',
        icon: 'people',
        access: ''
        },
        {
        title: 'Lanka',
        url: '/',
        icon: 'home',
        access: ''
        }
      ]
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list',
      access: ''
    },
    {
      title: 'Settings',
      url: '',
      icon: 'list',
      access: '',
      subPages: [
        {
          title: 'User Registration',
          url: '/user-reg',
          icon: 'person',
          access: ''
        },
        {
          title: 'Access Levels',
          url: '/access-levels',
          icon: 'key',
          access: ''
        },
      ]
    },

  ];

  public postData = {
    username: '',
    device_id: '',
    model: '',
    platform: []
  };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    public menuCtrl: MenuController,
    private device: Device,
    private storageService: StorageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.storageService.get(AuthConstants.AUTH).then(res => {
        if (!res) {
            return false;
        }
        this.fullName = res.fullname;
        this.region = res.region;
        this.mobile1 = res.mobile1;
        this.mobile2 = res.mobile2;
        this.email = res.email;
        this.userData = res.user_type;
        this.userText = res.userText;
        if (this.userData == '1') {
          this.appPages.forEach(b => {
            if (b.url == '') {
              b.subPages.forEach(c => {
                c.access = '1';
              });
            } else {
              b.access = '1';
            }
          });
          return false;
        }
        this.userData = JSON.parse(res.access_levels);
       // console.log(this.userData);
        this.userData.forEach(x => {
          const xa = '/' + x.name;
          x.name = x.name ? '' || xa : 'error';
        });
        // console.log(this.appPages);
        this.appPages.forEach(a => {
          if (a.url === '') {
            a.subPages.forEach(aa => {
              if (aa.url !== '') {
                this.userData.forEach(x => {
                  if (x.name === aa.url) {
                    const admindata = x.userType;
                    if (admindata === '1') {
                      aa.access = '1';
                      return false;
                    }
                    let n1 = x.accessValue;
                    n1 = n1.split(',');
                    if (n1[0] !== '1') {
                     aa.access = n1[1];
                    } else {
                     aa.access = n1[0];
                    }
                  }
                 });
              }
            });
          } else {
             this.userData.forEach(x => {
              if (x.name === a.url) {
                const admindata = x.userType;
                if (admindata === '1') {
                      a.access = '1';
                      return false;
                    }
                let n2 = x.accessValue;
                n2 = n2.split(',');
                if (n2[0] !== '1') {
                  a.access = n2[1];
                } else {
                  a.access = n2[0];
                }
              }
             });
          }
        });
        // console.log(this.appPages);
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
    this.menuCtrl.close();
    this.authService.logout(this.postData).subscribe(res => {
         // console.log('ok');
    });
  }

  menuClick() {
    console.log('ok');
  }
}
