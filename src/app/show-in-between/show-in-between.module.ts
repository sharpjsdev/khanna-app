import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowInBetweenPageRoutingModule } from './show-in-between-routing.module';

import { ShowInBetweenPage } from './show-in-between.page';
import { CaptchaComponent } from '../captcha/captcha.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowInBetweenPageRoutingModule
  ],
  declarations: [ShowInBetweenPage,CaptchaComponent]
})
export class ShowInBetweenPageModule {}
