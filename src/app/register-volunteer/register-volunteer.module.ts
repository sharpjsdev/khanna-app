import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterVolunteerPageRoutingModule } from './register-volunteer-routing.module';

import { RegisterVolunteerPage } from './register-volunteer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterVolunteerPageRoutingModule
  ],
  declarations: [RegisterVolunteerPage]
})
export class RegisterVolunteerPageModule {}
