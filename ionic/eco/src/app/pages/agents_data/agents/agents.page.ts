import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoadingService } from '../../../services/loading.service';
import { PermissionsService } from '../../../services/permissions.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.page.html',
  styleUrls: ['./agents.page.scss'],
})
export class AgentsPage implements OnInit {
  displayUserData: any;
  information: any = [];
  informationSearch: any = [];
  public searchTerm: any = '';
  public items: any;
  userToken = null;
  userData = null;
  userAccess = null;
  thisURL = null;
  access = null;
  admin = null;

  constructor(private authService: AuthService,
              private alertService: AlertService,
              private router: Router,
              private loadingService: LoadingService,
              private route: ActivatedRoute,
              private permissionsService: PermissionsService
             ) {


              }

  ngOnInit() {
    this.userToken = this.route.snapshot.data.userData;
    // console.log(this.userToken.token);
   // this.getAgents();
  }
  transform(collection: Array<any>, property: string): Array<any> {
    // prevents the application from breaking if the array of objects doesn't exist yet
    if(!collection) {
        return null;
    }

    const groupedCollection = collection.reduce((previous, current)=> {
        if(!previous[current[property]]) {
            previous[current[property]] = [current];
        } else {
            previous[current[property]].push(current);
        }

        return previous;
    }, {});

    // this will return an array of objects, each object containing a group of objects
    return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
}

  ionViewDidEnter() {
    this.thisURL = this.router.url.substr(1);
    this.userToken = this.route.snapshot.data.userData;
    this.userToken.dir = this.thisURL;
    this.access = this.permissionsService.Auth(this.userToken, this.thisURL);
    this.admin = this.permissionsService.Admin(this.userToken, this.thisURL);
    this.getAgents();
  }


  getAgents() {
    this.authService.Agents(this.userToken).subscribe((data: any) => {
        this.information = data.userData;
        let ssd = this.transform(this.information, 'header');
        this.informationSearch = ssd;
        this.information = ssd;
        console.log(this.informationSearch);
        this.loadingService.hideLoader();
    },
    error => {
      this.loadingService.hideLoader();
      this.router.navigate(['']);
    });
  }

filterItems(searchTerm: string) {
const checkValue = searchTerm.trim();
if (checkValue === '') {
  return this.information;
} else {
  return this.information.filter((item: { agent_name: string;
     address: string; region: string; mobile1: string; mobile2: string; commission: string; }) => {
    return (item.agent_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
    (item.address.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
    (item.region.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
    (item.mobile1.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
    (item.mobile2.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
    (item.commission.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
  });
}

}

setFilteredItems() {
  this.informationSearch = this.filterItems(this.searchTerm);
}

addNewItem() {
  this.router.navigate(['/agents-new']);
}

doRefresh(event) {
  this.searchTerm = '';
  this.getAgents();
  event.target.complete();
  this.loadingService.hideLoader();
}


dirList() {

}


Dialer(numberData) {
  window.open('tel:' + numberData, '_system');
}

userDetails(data: any) {
  const navigationExtras: NavigationExtras = {
    state: {
      agent: data
    }
  };
  this.router.navigate(['agent-details'], navigationExtras);
}

}
