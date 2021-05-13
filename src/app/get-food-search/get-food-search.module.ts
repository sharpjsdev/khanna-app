import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetFoodSearchPageRoutingModule } from './get-food-search-routing.module';

import { GetFoodSearchPage } from './get-food-search.page';
import { CaptchaComponent } from '../captcha/captcha.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetFoodSearchPageRoutingModule
  ],
  declarations: [GetFoodSearchPage,CaptchaComponent]
})
export class GetFoodSearchPageModule {}
