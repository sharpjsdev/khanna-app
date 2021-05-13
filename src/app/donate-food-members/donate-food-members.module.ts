import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonateFoodMembersPageRoutingModule } from './donate-food-members-routing.module';

import { DonateFoodMembersPage } from './donate-food-members.page';
import { CaptchaComponent } from '../captcha/captcha.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonateFoodMembersPageRoutingModule
  ],
  declarations: [DonateFoodMembersPage,CaptchaComponent]
})
export class DonateFoodMembersPageModule {}
