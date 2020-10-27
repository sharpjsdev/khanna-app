import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpContentPageRoutingModule } from './otp-content-routing.module';

import { OtpContentPage } from './otp-content.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpContentPageRoutingModule
  ],
  declarations: [OtpContentPage]
})
export class OtpContentPageModule {}
