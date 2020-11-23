import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsNewPage } from './clients-new.page';

const routes: Routes = [
  {
    path: '',
    component: ClientsNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsNewPageRoutingModule {}
