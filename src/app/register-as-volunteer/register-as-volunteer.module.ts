import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterAsVolunteerPageRoutingModule } from './register-as-volunteer-routing.module';

import { RegisterAsVolunteerPage } from './register-as-volunteer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterAsVolunteerPageRoutingModule
  ],
  declarations: [RegisterAsVolunteerPage]
})
export class RegisterAsVolunteerPageModule {}
