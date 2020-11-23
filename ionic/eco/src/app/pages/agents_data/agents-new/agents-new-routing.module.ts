import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentsNewPage } from './agents-new.page';

const routes: Routes = [
  {
    path: '',
    component: AgentsNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentsNewPageRoutingModule {}
