import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonateFoodPageRoutingModule } from './donate-food-routing.module';

import { DonateFoodPage } from './donate-food.page';
import { CaptchaComponent } from '../captcha/captcha.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonateFoodPageRoutingModule
  ],
  declarations: [DonateFoodPage,CaptchaComponent]
})
export class DonateFoodPageModule {}
