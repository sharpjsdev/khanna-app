import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseDonateOptionPageRoutingModule } from './choose-donate-option-routing.module';

import { ChooseDonateOptionPage } from './choose-donate-option.page';
import { CaptchaComponent } from '../captcha/captcha.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseDonateOptionPageRoutingModule
  ],
  declarations: [ChooseDonateOptionPage,CaptchaComponent]
})
export class ChooseDonateOptionPageModule {}
