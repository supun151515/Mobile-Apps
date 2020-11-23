import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loaderToShow: any;
  constructor(public loadingController: LoadingController) { }



  showLoader(value: string) {
    this.loaderToShow = this.loadingController.create({
      message: value
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
      });
    });
    //  this.hideLoader();
  }

  hideLoader() {
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 100);
  }
}
