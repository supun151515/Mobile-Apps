import { Component, OnInit } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { ToastService } from '../../../services/toast.service';
import { LoadingService } from '../../../services/loading.service';
import { Device } from '@ionic-native/device/ngx/';

class User {
  public id: number;
  public username: string;
  public accessname: string;
  public access: string;
}

@Component({
  selector: 'app-access-levels',
  templateUrl: './access-levels.page.html',
  styleUrls: ['./access-levels.page.scss'],
})
export class AccessLevelsPage implements OnInit {
userToken: any;
myURL: any;
user: User;
users: User[];
selectedUser: User[];
dirList = [];
chkAdmin = false;
chkRead = false;
chkWrite = false;
chkUpdate = false;
chkDelete = false;
currentUser: '';
public postData = {
  user_id: '0',
  user_type: '1',
  client_id: 0,
  client_id_text: '',
  agent_id: 0,
  agent_name: '',
  agent_name_text: '',
  full_name: '',
  status: 0,
  username: '',
  region: '',
  address: '',
  email: '',
  password: '',
  confirm: '',
  changePass: true,
  suspend: false
};
  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private toastService: ToastService,
              private loadingService: LoadingService,
              private router: Router,
              private device: Device) { }



  ngOnInit() {

  }
  ionViewDidEnter() {
    this.userToken = this.route.snapshot.data.userData;
    this.myURL = this.router.url.substr(1);
    this.userToken.dir = this.myURL;
    this.getUsers();
    this.printpath(this.router.config);
  }

  getUsers() {
    this.authService.Users(this.userToken).subscribe((data: any) => {
        this.users = data.userData;
    },
    error => {
       this.alertService.show('Network Error', '', 'Unable to connect with live data');
     // console.log('error');
    });
  }
  AccessLevels(user: any) {
    this.authService.AccessLevels(user, this.userToken).subscribe((data: any) => {
      let datajson = data.userData;
      if (datajson == 'no user found') {
        datajson = '{"detail" : {"checked": false }}';
        datajson = JSON.parse(datajson);
       // console.log(datajson.event.detail.checked);
        this.chkAdminButton(datajson);
        this.chkAdmin = false;
        this.chkRead = false;
        this.chkWrite = false;
        this.chkUpdate = false;
        this.chkDelete = false;
      } else {
        this.users = data.userData;
        this.users.forEach(x => {
        let vals = x.access.split(',');
        this.dirList.find(y => y.text == x.accessname).valueAdmin = Boolean(Number(vals[0]));
        this.dirList.find(y => y.text == x.accessname).valueRead = Boolean(Number(vals[1]));
        this.dirList.find(y => y.text == x.accessname).valueWrite = Boolean(Number(vals[2]));
        this.dirList.find(y => y.text == x.accessname).valueUpdate = Boolean(Number(vals[3]));
        this.dirList.find(y => y.text == x.accessname).valueDelete = Boolean(Number(vals[4]));
      });
      }
      
  },
  error => {
     this.alertService.show('Network Error', '', 'Unable to connect with live data');
   // console.log('error');
  });
  }

  userSearch(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    const ssd = this.selectedUser;
    this.postData.user_id = ssd['id'];
    this.postData.user_type = ssd['user_type'];
    this.postData.client_id = ssd['client_id'];
    if (this.postData.user_type == '1') {
      this.postData.client_id_text = 'Admin User';
      this.postData.agent_name_text = '';
    } else if (this.postData.user_type == '2') {
      this.postData.client_id_text = 'Agent User';
      this.postData.agent_name_text = 'Agent Name';
    } else if (this.postData.user_type == '3') {
      this.postData.client_id_text = 'Client User';
      this.postData.agent_name_text = 'Client Name';
    }
    this.postData.agent_name = ssd['agent_name'];
    this.currentUser = ssd['username'];
    this.AccessLevels(ssd);
  }
  printpath(config: Route[]) {
    for (let i = 0; i < config.length; i++) {
      const route = config[i];
      if (route.path == '**' || route.path == '') {

      } else {
        const modeldata = {
          text: route.path,
          valueAdmin: false,
          valueRead: false,
          valueWrite: false,
          valueUpdate: false,
          valueDelete: false,
        };
        this.dirList.push(modeldata);

      }
    }

  }

  chkAdminButton(event: any) {
    const status = event.detail.checked;
    this.dirList.forEach(x => {
      x.valueAdmin = status;
    });
  }
  chkReadButton(event) {
    const status = event.detail.checked;
    this.dirList.forEach(x => {
      x.valueRead = status;
    });
  }
  chkWriteButton(event) {
    const status = event.detail.checked;
    this.dirList.forEach(x => {
      x.valueWrite = status;
    });
  }
  chkUpdateButton(event) {
    const status = event.detail.checked;
    this.dirList.forEach(x => {
      x.valueUpdate = status;
    });
  }
  chkDeleteButton(event) {
    const status = event.detail.checked;
    this.dirList.forEach(x => {
      x.valueDelete = status;
    });
  }

  Save() {
    if (!this.selectedUser) {
      this.alertService.show('', '', 'Please select a user to update');
      return false;
    }
    this.dirList.forEach(x => {
      x.username = this.currentUser;
    });
    this.loadingService.showLoader('Please wait');
    this.authService.AccessLevelsSave(this.dirList, this.userToken).subscribe((data: any) => {
        this.loadingService.hideLoader();
        if (data.userData) {
          if (data.userData == 'done') {
            this.alertService.show('', 'Success', 'User Access Levels updated');
            return false;

          }
        }
    });
  }

  
  Default() {

  }

}
