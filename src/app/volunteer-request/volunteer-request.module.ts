import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VolunteerRequestPageRoutingModule } from './volunteer-request-routing.module';

import { VolunteerRequestPage } from './volunteer-request.page';
import { CaptchaComponent } from '../captcha/captcha.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VolunteerRequestPageRoutingModule
  ],
  declarations: [VolunteerRequestPage,CaptchaComponent]
})
export class VolunteerRequestPageModule {}
