import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoadingService } from '../../../services/loading.service';
import { PermissionsService } from '../../../services/permissions.service';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {
  @Pipe({name: 'groupBy'})
  displayUserData: any;
  information: any = [];
  informationSearch: any = [];
  keys: any = [];
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
              private permissionsService: PermissionsService) { }

ngOnInit() {
  this.userToken = this.route.snapshot.data.userData;
  }
ionViewDidEnter() {
  this.thisURL = this.router.url.substr(1);
  this.userToken = this.route.snapshot.data.userData;
  this.userToken.dir = this.thisURL;
  this.access = this.permissionsService.Auth(this.userToken, this.thisURL);
  this.admin = this.permissionsService.Admin(this.userToken, this.thisURL);
  this.getClients();
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
  getClients() {
    this.authService.Clients(this.userToken).subscribe((data: any) => {
        this.information = data.userData;
       // console.log(this.information);
        let ssd = this.transform(this.information, 'agent_name');

      //  console.log(ssd);
       // this.keys = Object.keys(data.userData);
        this.informationSearch = ssd;
        this.information = ssd;
        this.loadingService.hideLoader();
     //   console.log(this.keys);
     //   console.log(this.informationSearch[this.keys[0]]);
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
      /*  return this.information.filter((item: { client_name: string;
          address: string; region: string; mobile1: string; mobile2: string; }) => {
         return (item.client_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                (item.address.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                (item.region.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                (item.mobile1.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                (item.mobile2.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
       });
       */

      let filteredArray = this.information
      .filter((element) => 
      element.value.some((subElement) => (subElement.client_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ) ||
      (subElement.address.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 )
      ))
      .map(element => {
      return Object.assign({}, element, {value : element.value
        .filter(subElement => (subElement.client_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ) || 
        (subElement.address.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 )
        )});
      });
      // console.log(filteredArray);
      return filteredArray;

// below one remains the Agent Headers even no results

   //   return this.information.map((element) => {
 //       return {...element, value: element.value.filter((subElement) => subElement.client_name == searchTerm)};
   //   });


    }
    }


    setFilteredItems() {
      this.informationSearch = this.filterItems(this.searchTerm);
    }
    addNewItem() {
      this.router.navigate(['/clients-new']);
    }
    doRefresh(event) {
      this.searchTerm = '';
      this.getClients();
      event.target.complete();
      this.loadingService.hideLoader();
    }

    Dialer(numberData) {
      window.open('tel:' + numberData, '_system');
    }

    userDetails(data: any) {
      const navigationExtras: NavigationExtras = {
        state: {
          client: data
        }
      };
      this.router.navigate(['client-details'], navigationExtras);
    }

}
