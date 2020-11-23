import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from '../../../services/loading.service';
import { AlertService } from '../../../services/alert.service';
class City {
  public id: number;
  public name: string;
  public city: string;
}

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.page.html',
  styleUrls: ['./agent-details.page.scss'],
})
export class AgentDetailsPage implements OnInit {
  selectedCities: City[];
  cities: City[];
  myCity: any;
  thisURL = null;
  userToken = null;
  oldUserName = '';
  newAgentName = false;
  public postData = {
    id: '',
    agent_type: '1',
    agent_name: '',
    address: '',
    region: '',
    mobile1: '',
    mobile2: '',
    email: '',
    commission: '',
    picture: '',
    remarks: '',
    newAgentName: false,
  };
  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private loadingService: LoadingService,
              private alertService: AlertService) {
    if (this.router.getCurrentNavigation().extras.state) {

        this.postData = this.router.getCurrentNavigation().extras.state.agent;
        this.oldUserName = this.postData.agent_name;
        this.getCities();
    }
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.thisURL = this.router.url.substr(1);
    this.userToken = this.route.snapshot.data.userData;
    this.userToken.dir = this.thisURL;
  }
  cityChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {

  }

  getCities() {
    this.authService.Cities().subscribe((data: any) => {
        this.cities = data;
        this.myCity = [];
        const city = this.postData.region.split(',');
        city.forEach(x => {
        this.myCity.push(this.cities.find(i => i.city == x));
      });
        this.selectedCities = this.myCity;
    },
    error => {
      this.alertService.show('Network Error', '', 'Unable to connect with live data');
    });
  }
  loginAction() {
    if (isNaN(+this.postData.commission)) {
      this.alertService.show('', '', 'Invalid commission rate');
      return false;
        }
    if (this.postData.agent_name == '' || this.postData.commission == '') {
      this.alertService.show('', '' , 'Invalid Agent Name or commission rate');
      return false;
    }
    // console.log(this.selectedCities.length);
    if (this.selectedCities) {
      const region = this.selectedCities.map(val => {
        return val.city;
      }).join(',');
      this.postData.region = region;
    }
    if (this.postData.agent_name == this.oldUserName) {
      this.newAgentName = false;
    } else {
      this.newAgentName = true;
    }
    this.postData.newAgentName = this.newAgentName;
    this.loadingService.showLoader('Please wait');
    this.authService.editAgent(this.postData, this.userToken).subscribe((res: any) => {
      this.loadingService.hideLoader();
      if(res.userData) {
        if (res.userData == 'done') {
          this.alertService.show('', 'Success', 'Agent data has been updated successfully');
          return false;
        }
        if (res.userData == 'exist') {
          this.alertService.show('', 'Error', 'Agent name already exist, Please change the agent name and try update again');
          return false;
        }
        if (res.userData == 'no user found') {
          this.alertService.show('', 'Critical error', 'Matching user not found!');
          return false;
        }
        if (res.userData == 'no agent found') {
          this.alertService.show('', 'Critical error', 'Matching Agent not found!');
          return false;
        }
      }
    });
  }

  delete() {
    if (this.postData.id) {
      this.alertService.confirm('', 'Delete Confirmation', 'Are you sure, you want to delete this agent?').then(res => {
        if (res.data == true) {
          this.loadingService.showLoader('Please wait');
          this.authService.deleteAgent(this.postData, this.userToken).subscribe((rest: any) => {
          this.loadingService.hideLoader();
          if (rest.userData) {
            if (rest.userData == 'done') {
              this.alertService.show('', 'Success', 'Agent data has been deleted successfully');
              return false;
            }
            if (rest.userData == 'no user found') {
              this.alertService.show('', 'Error', 'Unable to find the user data');
              return false;
            }
            if (rest.userData == 'no agent found') {
              this.alertService.show('', 'Error', 'Unable to find the Agent data');
              return false;
            }
          }
          });
        } else {
          // this.alertService.show('', 'Error', 'Error connecting to the server: ' + res);
          // return false;
       }
      }, error => {
        this.alertService.show('', 'error', 'Network connection error. Please check your internet settings');
      });
    } else {
      this.alertService.show('', 'Error', 'Unable to find the Agent data');
      return false;
    }
  }

  Exit() {
    this.router.navigate(['agents']);
  }
}
