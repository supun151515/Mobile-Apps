import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentDetailsPage } from './agent-details.page';

const routes: Routes = [
  {
    path: '',
    component: AgentDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentDetailsPageRoutingModule {}
