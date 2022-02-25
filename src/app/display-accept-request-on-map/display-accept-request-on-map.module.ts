import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayAcceptRequestOnMapPageRoutingModule } from './display-accept-request-on-map-routing.module';

import { DisplayAcceptRequestOnMapPage } from './display-accept-request-on-map.page';
import { CaptchaComponent } from '../captcha/captcha.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayAcceptRequestOnMapPageRoutingModule
  ],
  declarations: [DisplayAcceptRequestOnMapPage,CaptchaComponent]
})
export class DisplayAcceptRequestOnMapPageModule {}
