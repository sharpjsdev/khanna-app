import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimplePushNotificationPage } from './simple-push-notification.page';

const routes: Routes = [
  {
    path: '',
    component: SimplePushNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimplePushNotificationPageRoutingModule {}
