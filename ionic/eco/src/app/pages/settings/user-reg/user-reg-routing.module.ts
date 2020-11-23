import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserRegPage } from './user-reg.page';

const routes: Routes = [
  {
    path: '',
    component: UserRegPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRegPageRoutingModule {}
