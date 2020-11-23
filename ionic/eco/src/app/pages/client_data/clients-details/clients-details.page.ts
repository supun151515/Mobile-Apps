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
  selector: 'app-clients-details',
  templateUrl: './clients-details.page.html',
  styleUrls: ['./clients-details.page.scss'],
})
export class ClientsDetailsPage implements OnInit {
  selectedCities: City[];
  cities: City[];
  myCity: any;
  thisURL = null;
  userToken = null;
  oldClientName = '';
  newClientName = false;
  public postData = {
    id: '',
    agent_id: '0',
    client_name: '',
    address: '',
    region: '',
    mobile1: '',
    mobile2: '',
    email: '',
    picture: '',
    remarks: '',
    status: '',
    newClientName: false,
  };
  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private loadingService: LoadingService,
              private alertService: AlertService) {
    if (this.router.getCurrentNavigation().extras.state) {

        this.postData = this.router.getCurrentNavigation().extras.state.client;
        this.oldClientName = this.postData.client_name;
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
    console.log(this.postData);
    if (this.postData.agent_id == '0' || this.postData.agent_id == '') {
      this.alertService.show('', '', 'Invalid Agent code');
      return false;
        }
    if (this.postData.client_name == '') {
      this.alertService.show('', '' , 'Invalid Client Name');
      return false;
    }
    // console.log(this.selectedCities.length);
    if (this.selectedCities) {
      const region = this.selectedCities.map(val => {
        return val.city;
      }).join(',');
      this.postData.region = region;
    }
    console.log(this.postData);

    if (this.postData.client_name == this.oldClientName) {
      this.newClientName = false;
    } else {
      this.newClientName = true;
    }
    this.postData.newClientName = this.newClientName;
    this.loadingService.showLoader('Please wait');
    this.authService.editClient(this.postData, this.userToken).subscribe((res: any) => {
      this.loadingService.hideLoader();
      if(res.userData) {
        if (res.userData == 'done') {
          this.alertService.show('', 'Success', 'Client data has been updated successfully');
          return false;
        }
        if (res.userData == 'exist') {
          this.alertService.show('', 'Error', 'Client name already exist, Please change the client name and try update again');
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
      this.alertService.confirm('', 'Delete Confirmation', 'Are you sure, you want to delete this Client?').then(res => {
        if (res.data == true) {
          this.loadingService.showLoader('Please wait');
          this.authService.deleteClient(this.postData, this.userToken).subscribe((rest: any) => {
          this.loadingService.hideLoader();
          if (rest.userData) {
            if (rest.userData == 'done') {
              this.alertService.show('', 'Success', 'Client data has been deleted successfully');
              return false;
            }
            if (rest.userData == 'no user found') {
              this.alertService.show('', 'Error', 'Unable to find the user data');
              return false;
            }
            if (rest.userData == 'no agent found') {
              this.alertService.show('', 'Error', 'Unable to find the client data');
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
      this.alertService.show('', 'Error', 'Unable to find the client data');
      return false;
    }
  }

  Exit() {
    this.router.navigate(['clients']);
  }
}
