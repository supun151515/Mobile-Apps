import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsDetailsPage } from './clients-details.page';

const routes: Routes = [
  {
    path: '',
    component: ClientsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsDetailsPageRoutingModule {}
