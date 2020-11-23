import { HomeGuard } from './../guards/home.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { UserDataResolver } from '../resolvers/userData.resolver';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    canActivate: [HomeGuard],
    resolve: {
       userData$: UserDataResolver
    },
    children: [
      {
        path: 'feed',
        loadChildren: () =>
          import('../pages/feed/feed.module').then(
            m => m.FeedPageModule
          )
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('../pages/notifications/notifications.module').then(
            m => m.NotificationsPageModule
          )
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../pages/settings/settings.module').then(
            m => m.SettingsPageModule
          )
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('../pages/messages/messages.module').then(
            m => m.MessagesPageModule
          )
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
