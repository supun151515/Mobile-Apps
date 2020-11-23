import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { StorageService } from './../../services/storage.service';
import { AuthConstants } from './../../config/auth-constants';
import { HttpService } from '../../services/http.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  displayUserData: any;

  constructor(private authService: AuthService, 
     private alertController: AlertController,
     private storageService: StorageService,
     private hhtpService: HttpService) { }

  ngOnInit() {
    this.authService.userData$.subscribe((res:any) => {
      this.displayUserData = res;
    });
  }


logout() {
  this.authService.logout();
}  

async Alert() {
    const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Sub Alert',
        message: 'This is the alert message',
        buttons: ['OK']
    });
    await alert.present();
}

getAuthKey() {
   ////// console.log(this.hhtpService.getToken());
  /*
  this.storageService.get(AuthConstants.AUTH).then(res => {
    if (res) {
      console.log(res.token);
    }
});
}
*/

//console.log(this.authService.getUserData());

}

}