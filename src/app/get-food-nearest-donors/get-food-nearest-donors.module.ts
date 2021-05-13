import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetFoodNearestDonorsPageRoutingModule } from './get-food-nearest-donors-routing.module';

import { GetFoodNearestDonorsPage } from './get-food-nearest-donors.page';
import { CaptchaComponent } from '../captcha/captcha.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetFoodNearestDonorsPageRoutingModule
  ],
  declarations: [GetFoodNearestDonorsPage,CaptchaComponent]
})
export class GetFoodNearestDonorsPageModule {}
