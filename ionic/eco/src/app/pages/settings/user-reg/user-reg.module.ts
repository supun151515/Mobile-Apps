import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserRegPageRoutingModule } from './user-reg-routing.module';

import { UserRegPage } from './user-reg.page';
import { IonicSelectableModule } from 'ionic-selectable';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRegPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [UserRegPage]
})
export class UserRegPageModule {}
