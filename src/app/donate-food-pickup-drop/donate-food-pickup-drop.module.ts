import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonateFoodPickupDropPageRoutingModule } from './donate-food-pickup-drop-routing.module';

import { DonateFoodPickupDropPage } from './donate-food-pickup-drop.page';
import { CaptchaComponent } from '../captcha/captcha.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonateFoodPickupDropPageRoutingModule
  ],
  declarations: [DonateFoodPickupDropPage,CaptchaComponent]
})
export class DonateFoodPickupDropPageModule {}
