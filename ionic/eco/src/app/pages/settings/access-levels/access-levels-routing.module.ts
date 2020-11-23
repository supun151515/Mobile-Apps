import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessLevelsPage } from './access-levels.page';

const routes: Routes = [
  {
    path: '',
    component: AccessLevelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessLevelsPageRoutingModule {}
