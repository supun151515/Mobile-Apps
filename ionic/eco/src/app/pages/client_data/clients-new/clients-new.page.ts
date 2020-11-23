import { Component, OnInit } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from '../../../services/loading.service';
import { AlertService } from '../../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PermissionsService } from '../../../services/permissions.service';

class Agent {
  public id: number;
  public name: string;
}
class City {
  public id: number;
  public name: string;
  public city: string;
}
@Component({
  selector: 'app-clients-new',
  templateUrl: './clients-new.page.html',
  styleUrls: ['./clients-new.page.scss'],
})
export class ClientsNewPage implements OnInit {
  agents: Agent[];
  agent: Agent;
  selectedAgent: Agent[];
  cities: City[];
  city: City;
  selectedCities: City[];
  displayUserData: any;
  information: any = [];
  myCity: any;

  public postData = {
    agent_id: 0,
    client_type: '1',
    client_name: '',
    address: '',
    region: '',
    mobile1: '',
    mobile2: '',
    email: '',
    remarks: '',
    picture: '',
    status: ''
  };
  userToken = null;
  thisURL = null;
  access = null;
  constructor(private authService: AuthService,
              private loadingService: LoadingService,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute,
              private permissionsService: PermissionsService) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.thisURL = this.router.url.substr(1);
    this.userToken = this.route.snapshot.data.userData;
    this.userToken.dir = this.thisURL;
    this.access = this.permissionsService.Auth(this.userToken, this.thisURL);
    this.getCities();
    this.getAgents();
  }


  agentSelect(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    const ssd = this.selectedAgent;
    // console.log(ssd);
    this.postData.agent_id = +ssd['id'];
  }

  getCities() {
    this.authService.Cities().subscribe((data: any) => {
        this.information = data;
        this.cities = this.information;
    },
    error => {
      this.alertService.show('Network Error', '', 'Unable to connect with live data');
    });
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

  cityChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {

  }
  loginAction() {

    if (this.postData.client_name == '') {
      this.alertService.show('', '' , 'Invalid Client Name');
      return false;
    }
    if (this.postData.agent_id == 0) {
      this.alertService.show('', '' , 'Select a Agent name');
      return false;
    }
    // console.log(this.selectedCities.length);
    if (this.selectedCities) {
      const region = this.selectedCities.map(val => {
        return val.city;
      }).join(',');
      this.postData.region = region;
    }

    this.loadingService.showLoader('Please wait');
    this.authService.addClient(this.postData, this.userToken).subscribe((res: any) => {
      this.loadingService.hideLoader();
      if(res.userData) {
        if (res.userData == 'done') {
          this.alertService.show('', 'Success', 'Client data has been updated successfully');
          return false;
        }
        if (res.userData == 'exist') {
          this.alertService.show('', 'Error', 'Client name already exist');
          return false;
        }
        if (res.userData == 'no user found') {
          this.alertService.show('', 'Critical error', 'Matching user not found!');
          return false;
        }
      }
    });
  }

  Exit() {
    this.router.navigate(['clients']);
  }

}
