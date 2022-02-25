import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VolunteerFoodRequestPageRoutingModule } from './volunteer-food-request-routing.module';

import { VolunteerFoodRequestPage } from './volunteer-food-request.page';
import { CaptchaComponent } from '../captcha/captcha.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VolunteerFoodRequestPageRoutingModule
  ],
  declarations: [VolunteerFoodRequestPage,CaptchaComponent]
})
export class VolunteerFoodRequestPageModule {}
