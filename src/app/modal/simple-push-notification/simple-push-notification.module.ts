import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimplePushNotificationPageRoutingModule } from './simple-push-notification-routing.module';

import { SimplePushNotificationPage } from './simple-push-notification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimplePushNotificationPageRoutingModule
  ],
  declarations: [SimplePushNotificationPage]
})
export class SimplePushNotificationPageModule {}
