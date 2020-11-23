import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  displayUserData: any;
  information: any;
  constructor(private http: HttpService,
              private authService: AuthService) {

   }



  ngOnInit() {
     this.getToken();

  }

  logout() {
    this.authService.logout();
  }

  toggleSelection(i) {
    this.information[i].open = !this.information[i].open;
  }
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

  getCustomers() {
      this.authService.customers(this.displayUserData).subscribe((data: any) => {
      this.information = data;
      });
  }
  getAgents() {
    this.authService.Agents(this.authService.displayUserData).subscribe((data: any) => {
    this.information = data.userData;
    console.log(this.information);
    });
}
  getToken() {
    this.authService.userData$.subscribe((res: any) => {
      this.displayUserData = res;
      if (res) {
        this.getAgents();
      }
      });
  }



}
