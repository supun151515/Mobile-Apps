import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccessLevelsPageRoutingModule } from './access-levels-routing.module';

import { AccessLevelsPage } from './access-levels.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccessLevelsPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [AccessLevelsPage]
})
export class AccessLevelsPageModule {}
