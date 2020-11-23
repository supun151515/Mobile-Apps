import { Component, OnInit } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { ToastService } from '../../../services/toast.service';
import { LoadingService } from '../../../services/loading.service';
class Agent {
  public id: number;
  public name: string;
}
class Client {
  public id: number;
  public name: string;
}
class User {
  public id: number;
  public name: string;
}

@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.page.html',
  styleUrls: ['./user-reg.page.scss'],
})
export class UserRegPage implements OnInit {
  agents: Agent[];
  agent: Agent;
  selectedAgent: Agent[];
  clients: Client[];
  client: Client;
  selectedClient: Client[];
  users: User[];
  user: User;
  selectedUser: User[];
  userToken = null;
  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private toastService: ToastService,
              private loadingService: LoadingService,
              private router: Router) { }
  public postData = {
    user_id: '0',
    user_type: '1',
    client_id: 0,
    agent_id: 0,
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

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.userToken = this.route.snapshot.data.userData;
    this.userToken.dir = this.router.url.substr(1);
    this.getAgents();
    this.getClients();
    this.getUsers();
  }
  getAgents() {
    this.authService.Agents(this.userToken).subscribe((data: any) => {
        this.agents = data.userData;
    },
    error => {
      this.alertService.show('Network Error', '', 'Unable to connect with live data');
     // console.log('error');
    });
  }
  getClients() {
    this.authService.Clients(this.userToken).subscribe((data: any) => {
        this.clients = data.userData;
    },
    error => {
        this.alertService.show('Network Error', '', 'Unable to connect with live data');
    //  console.log('error');
    });
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
  agentSelect(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    const ssd = this.selectedAgent;
    // console.log(ssd);
    this.postData.agent_id = +ssd['id'];
    this.postData.full_name = ssd['agent_name'];
    this.postData.region = ssd['region'];
    this.postData.address = ssd['address'];
    this.postData.email = ssd['email'];
  //  this.postData.client_id = ssd['id'];
  }
  clientSelect(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    const ssd = this.selectedClient;
    // console.log(ssd);
    this.postData.client_id = +ssd['id'];
    this.postData.full_name = ssd['client_name'];
    this.postData.region = ssd['region'];
    this.postData.address = ssd['address'];
    this.postData.email = ssd['email'];
  }

  userSearch(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    const ssd = this.selectedUser;
   // this.clearUserTypes();
    this.postData.user_id = ssd['id'];
    this.postData.user_type = ssd['user_type'];
    this.postData.full_name = ssd['full_name'];
    this.postData.agent_id = ssd['client_id'];
    this.postData.client_id = ssd['client_id'];
    this.postData.email = ssd['email'];
    this.postData.username = ssd['username'];
    this.postData.status = ssd['status'];
    this.postData.password = 'password';
    this.postData.confirm = 'password';
    if (this.postData.status == 1) {
      this.postData.changePass = false;
      this.postData.suspend = false;
    } else if (this.postData.status == 2) {
      this.postData.changePass = true;
      this.postData.suspend = false;
    } else if (this.postData.status == 3) {
      this.postData.changePass = false;
      this.postData.suspend = true;
    } else if (this.postData.status == 4) {
      this.postData.changePass = true;
      this.postData.suspend = true;
    }
    if (this.postData.user_type == '2') {
      const getAgent: any = this.agents.find(x => x.id == this.postData.agent_id);
      this.selectedAgent  = getAgent;
      this.postData.region = getAgent['region'];
      this.postData.address = getAgent['address']

    } else if (this.postData.user_type == '3') {
      const getClient: any = this.clients.find(x => x.id == this.postData.client_id);
      this.selectedClient = getClient;
      this.postData.region = getClient['region'];
      this.postData.address = getClient['address'];
    }
  }


  check() {
  console.log(this.postData.user_type);

  }
  userSelect(event: any) {
  }

  clearUserTypes() {
   this.selectedAgent = null;
   this.selectedClient = null;
   this.selectedUser = null;
   this.postData.user_type = '1';
   this.postData.region = '';
   this.postData.address = '';
   this.postData.email = '';
   this.postData.full_name = '';
   this.postData.password = '';
   this.postData.confirm = '';
   this.postData.client_id = 0;
   this.postData.agent_id = 0;
   this.postData.username = '';
   this.postData.changePass = true;
   this.postData.suspend = false;
   this.postData.user_id = '0';
  }

  addNew() {
    if (this.postData.password !== this.postData.confirm
       || this.postData.password == 'password'
       || this.postData.password == '') {
      this.alertService.show('', 'Error', 'Password do not match or you did not type a password');
      return false;
    }
    if (this.postData.user_id !== '0') {
      this.alertService.show('', 'Error', 'Unable to use exiting user to add new. Clear the form to begin.');
      return false;
    }

    if (this.postData.username == '' || this.postData.full_name == '') {
      this.alertService.show('', 'Error', 'Username and Full name fields are required');
      return false;
    }
    if (this.postData.user_type == '2') {
      if (this.postData.agent_id == 0) {
        this.alertService.show('', '', 'Please select a agent from the dropdown list');
        return false;
      }
    }
    if (this.postData.user_type == '3') {
      if (this.postData.client_id == 0) {
        this.alertService.show('', '', 'Please select a client from the dropdown list');
        return false;
      }
    }
    this.loadingService.showLoader('Please wait');
    this.authService.addUsers(this.postData, this.userToken).subscribe((res: any) => {
      this.loadingService.hideLoader();
      if (res.userData) {
          if (res.userData == 'done') {
          this.getUsers();
          this.alertService.show('', 'Success', 'User data has been updated successfully');
          return false;
        } else if (res.userData == 'no agent') {
          this.alertService.show('', 'Error', 'Unable to find the agent details. Try reselecting the agent from the list');
          return false;
        } else if (res.userData == 'no client') {
          this.alertService.show('', 'Error', 'Unable to find the client details. Try reselecting the client from the list');
          return false;
        } else if (res.userData == 'exist') {
          this.alertService.show('', 'Error', 'This username already exist');
          return false;
        }
      } else {
        this.alertService.show('', 'Error', 'Error connecting to the server: ' + res);
        return false;
      }
    }, error => {
      this.alertService.show('', 'error', 'Network connection error. Please check your internet settings');
    });
  }


  update() {
    if (this.postData.user_id == '0') {
      this.alertService.show('', 'Error', 'Unable to find the user. Clear the form and select a user to update.');
      return false;
     }
    if (this.postData.password !== this.postData.confirm
      || this.postData.password == '') {
     this.alertService.show('', 'Error', 'Password do not match or you did not type a password');
     return false;
   }

    if (this.postData.username == '' || this.postData.full_name == '') {
     this.alertService.show('', 'Error', 'Username and Full name fields are required');
     return false;
   }
    if (this.postData.user_type == '2') {
     if (this.postData.agent_id == 0) {
       this.alertService.show('', '', 'Please select a agent from the dropdown list');
       return false;
     }
   }
    if (this.postData.user_type == '3') {
     if (this.postData.client_id == 0) {
       this.alertService.show('', '', 'Please select a client from the dropdown list');
       return false;
     }
   }
    this.loadingService.showLoader('Please wait');
    this.authService.updateUsers(this.postData, this.userToken).subscribe((res: any) => {
     this.loadingService.hideLoader();
     if (res.userData) {
        if (res.userData == 'done') {
          this.alertService.show('', 'Success', 'User data has been updated successfully');
          return false;
        } else if (res.userData == 'no agent') {
          this.alertService.show('', 'Error', 'Unable to find the agent details. Try reselecting the agent from the list');
          return false;
        } else if (res.userData == 'no client') {
          this.alertService.show('', 'Error', 'Unable to find the client details. Try reselecting the client from the list');
          return false;
        }
     } else {
         this.alertService.show('', 'Error', 'Error connecting to the server: ' + res);
         return false;
     }
   }, error => {
     this.alertService.show('', 'error', 'Network connection error. Please check your internet settings');
   });
  }

  delete() {
    if (this.postData.user_id == '0') {
      this.alertService.show('', 'Error', 'Unable to find the user. Clear the form and select a user to delete.');
      return false;
    }
    this.alertService.confirm('', 'Delete Confirmation', 'Are you sure, do you want to delete this user?').then((res) => {
    if (res.data == true) {
      this.authService.deleteUser(this.postData, this.userToken).subscribe((rest: any) => {
        if (rest.userData) {
          if (rest.userData == 'done') {
            this.getUsers();
            this.alertService.show('', 'Success', 'User data has been deleted successfully');
            return false;
          } else {
            this.alertService.show('', 'Error', 'Unable to find the user data');
            return false;
          }
        } else {
          this.alertService.show('', 'Error', 'Error connecting to the server: ' + res);
          return false;
       }
      }, error => {
        this.alertService.show('', 'error', 'Network connection error. Please check your internet settings');
      });
    }
  });

  }
}
