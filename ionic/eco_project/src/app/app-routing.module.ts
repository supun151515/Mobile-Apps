import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './guards/home.guard';
import { LoginGuard } from './guards/login.guard';
import { UserDataResolver } from './resolvers/userData.resolver';


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
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'agents',
    canActivate: [HomeGuard],
    resolve: {
      userData: UserDataResolver
    },
    loadChildren: () => import('./pages/agents/agents.module').then( m => m.AgentsPageModule)
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [UserDataResolver]
})
export class AppRoutingModule { }
