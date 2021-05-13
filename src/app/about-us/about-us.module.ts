import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CaptchaComponent } from '../captcha/captcha.component';
import { AboutUsPageRoutingModule } from './about-us-routing.module';
import { AboutUsPage } from './about-us.page';
import { RecaptchaModule } from "ng-recaptcha";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutUsPageRoutingModule,
    RecaptchaModule
  ],
  declarations: [AboutUsPage,CaptchaComponent]
})
export class AboutUsPageModule {}
