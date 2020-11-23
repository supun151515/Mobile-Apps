import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserDataResolver } from './resolvers/userData.resolver';
import { LoginGuard } from './guards/login.guard';
import { HomeGuard } from './guards/home.guard';

const routes: Routes = [

  {
    path: '',
    canActivate: [LoginGuard],
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    canActivate: [HomeGuard],
    resolve: {
      userData: UserDataResolver
    },
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'agents',
    canActivate: [HomeGuard],
    resolve: {
      userData: UserDataResolver
    },
    loadChildren: () => import('./pages/agents_data/agents/agents.module').then( m => m.AgentsPageModule)
  },
  {
    path: 'agents-new',
    canActivate: [HomeGuard],
    resolve: {
      userData: UserDataResolver
    },
    loadChildren: () => import('./pages/agents_data/agents-new/agents-new.module').then( m => m.AgentsNewPageModule)
  },
  {
    path: 'agent-details',
    canActivate: [HomeGuard],
    resolve: {
      userData: UserDataResolver
    },
    loadChildren: () => import('./pages/agents_data/agent-details/agent-details.module').then( m => m.AgentDetailsPageModule)
  },
  {
    path: 'clients',
    canActivate: [HomeGuard],
    resolve: {
      userData: UserDataResolver
    },
    loadChildren: () => import('./pages/client_data/clients/clients.module').then( m => m.ClientsPageModule)
  },
  {
    path: 'clients-new',
    canActivate: [HomeGuard],
    resolve: {
      userData: UserDataResolver
    },
    loadChildren: () => import('./pages/client_data/clients-new/clients-new.module').then( m => m.ClientsNewPageModule)
  },
  {
    path: 'client-details',
    canActivate: [HomeGuard],
    resolve: {
      userData: UserDataResolver
    },
    loadChildren: () => import('./pages/client_data/clients-details/clients-details.module').then( m => m.ClientsDetailsPageModule)
  },
  {
    path: 'user-reg',
    canActivate: [HomeGuard],
    resolve: {
      userData: UserDataResolver
    },
    loadChildren: () => import('./pages/settings/user-reg/user-reg.module').then( m => m.UserRegPageModule)
  },
  {
    path: 'access-levels',
    canActivate: [HomeGuard],
    resolve: {
      userData: UserDataResolver
    },
    loadChildren: () => import('./pages/settings/access-levels/access-levels.module').then( m => m.AccessLevelsPageModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [UserDataResolver]
})
export class AppRoutingModule {}
