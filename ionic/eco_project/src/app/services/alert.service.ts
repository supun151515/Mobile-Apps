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
}
