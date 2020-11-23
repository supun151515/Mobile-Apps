import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientsDetailsPageRoutingModule } from './clients-details-routing.module';

import { ClientsDetailsPage } from './clients-details.page';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientsDetailsPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [ClientsDetailsPage]
})
export class ClientsDetailsPageModule {}
