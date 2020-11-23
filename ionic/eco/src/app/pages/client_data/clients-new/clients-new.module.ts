import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientsNewPageRoutingModule } from './clients-new-routing.module';

import { ClientsNewPage } from './clients-new.page';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientsNewPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [ClientsNewPage]
})
export class ClientsNewPageModule {}
