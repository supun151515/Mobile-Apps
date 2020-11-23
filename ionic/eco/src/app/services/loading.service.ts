import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loaderToShow: any;
  isLoading = false;
  constructor(public loadingController: LoadingController) { }


  async showLoader(value: string) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: value,
      duration: 1000,
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
          // a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async hideLoader() {
    this.isLoading = false;
   // return await this.loadingController.dismiss();
  }


}
