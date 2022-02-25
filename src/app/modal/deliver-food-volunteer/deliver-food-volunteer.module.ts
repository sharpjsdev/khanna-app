import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliverFoodVolunteerPageRoutingModule } from './deliver-food-volunteer-routing.module';

import { DeliverFoodVolunteerPage } from './deliver-food-volunteer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliverFoodVolunteerPageRoutingModule
  ],
  declarations: [DeliverFoodVolunteerPage]
})
export class DeliverFoodVolunteerPageModule {}
