import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgentDetailsPageRoutingModule } from './agent-details-routing.module';
import { AgentDetailsPage } from './agent-details.page';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgentDetailsPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [AgentDetailsPage]
})
export class AgentDetailsPageModule {}
