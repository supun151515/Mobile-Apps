import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(public alertController: AlertController) { }


  async show(Header: string, Subtitle: string, Message: string) {
    const alert = await this.alertController.create({
      header: Header,
      subHeader: Subtitle,
      message: Message,
      buttons: ['OK']
    });

    await alert.present();
  }


  async confirm(Header: string, Subtitle: string, Message: string) {
    let choice;
    const alert = await this.alertController.create({
        header: Header,
        subHeader: Subtitle,
        message: Message,
        buttons: [{
            text: 'Delete',
            role: 'delete',
            handler: () => {
                alert.dismiss(true);
                return false;
            }
        }, {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
                alert.dismiss(false);
                return false;
            }
        }]
    });

    await alert.present();
    await alert.onDidDismiss().then((data) => {
        choice = data;
    })
    return choice;
}


}
