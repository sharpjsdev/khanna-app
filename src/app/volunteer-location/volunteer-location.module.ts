import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VolunteerLocationPageRoutingModule } from './volunteer-location-routing.module';

import { VolunteerLocationPage } from './volunteer-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VolunteerLocationPageRoutingModule
  ],
  declarations: [VolunteerLocationPage]
})
export class VolunteerLocationPageModule {}
