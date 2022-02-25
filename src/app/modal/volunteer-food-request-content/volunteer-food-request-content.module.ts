import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VolunteerFoodRequestContentPageRoutingModule } from './volunteer-food-request-content-routing.module';

import { VolunteerFoodRequestContentPage } from './volunteer-food-request-content.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VolunteerFoodRequestContentPageRoutingModule
  ],
  declarations: [VolunteerFoodRequestContentPage]
})
export class VolunteerFoodRequestContentPageModule {}
