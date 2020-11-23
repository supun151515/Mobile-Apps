import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { AgentsNewPageRoutingModule } from './agents-new-routing.module';
import { AgentsNewPage } from './agents-new.page';
import { FormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    AgentsNewPageRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    IonicSelectableModule
  ],
  declarations: [AgentsNewPage]
})
export class AgentsNewPageModule {}
