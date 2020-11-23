import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from '../../../services/loading.service';
import { AlertService } from '../../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

class City {
  public id: number;
  public name: string;
  public city: string;
}
@Component({
  selector: 'app-agents-new',
  templateUrl: './agents-new.page.html',
  styleUrls: ['./agents-new.page.scss'],
})
export class AgentsNewPage implements OnInit {

  cities: City[];
  city: City;
  selectedCities: City[];
  displayUserData: any;
  information: any = [];
  myCity: any;

  public postData = {
    agent_type: '1',
    agent_name: '',
    agent_address: '',
    region: '',
    mobile1: '',
    mobile2: '',
    email: '',
    commission: '',
    picture: '',
    remarks: ''
  };
  userToken = null;
  thisURL = null;
  access = null;

  constructor(private authService: AuthService,
              private loadingService: LoadingService,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute) {


               }

  ngOnInit() {

  // let agent_name = new FormControl('Dayana', Validators.required);
  }
  ionViewDidEnter() {
    this.thisURL = this.router.url.substr(1);
    this.userToken = this.route.snapshot.data.userData;
    this.userToken.dir = this.thisURL;
    this.getCities();
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

  cityChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {

  }
  loginAction() {
   // this.selectedCities = [this.cities[5], this.cities[6]];
    // console.log(this.selectedCities);

 /*

    this.myCity = [];
    this.myCity.push(this.cities.find(x => x.id == 2));
    this.myCity.push(this.cities.find(x => x.id == 3));
    console.log(this.myCity);
    this.selectedCities = this.myCity;
*/
    // this.postData.region = [this.myCity];

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

    this.loadingService.showLoader('Please wait');
    this.authService.addAgent(this.postData, this.userToken).subscribe((res: any) => {
      this.loadingService.hideLoader();
      if(res.userData) {
        if (res.userData == 'done') {
          this.alertService.show('', 'Success', 'Agent data has been updated successfully');
          return false;
        }
        if (res.userData == 'exist') {
          this.alertService.show('', 'Error', 'Agent name already exist');
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
    this.router.navigate(['agents']);
  }
}
