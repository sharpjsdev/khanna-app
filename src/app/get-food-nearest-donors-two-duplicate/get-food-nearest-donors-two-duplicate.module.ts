import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetFoodNearestDonorsTwoDuplicatePageRoutingModule } from './get-food-nearest-donors-two-duplicate-routing.module';
import { PipesModule } from '../pipes/pipes.module';
import { GetFoodNearestDonorsTwoDuplicatePage } from './get-food-nearest-donors-two-duplicate.page';
import { CaptchaComponent } from '../captcha/captcha.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    GetFoodNearestDonorsTwoDuplicatePageRoutingModule
  ],
  declarations: [GetFoodNearestDonorsTwoDuplicatePage,CaptchaComponent]
})
export class GetFoodNearestDonorsTwoDuplicatePageModule {}
