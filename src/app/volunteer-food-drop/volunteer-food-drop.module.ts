import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VolunteerFoodDropPageRoutingModule } from './volunteer-food-drop-routing.module';

import { VolunteerFoodDropPage } from './volunteer-food-drop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VolunteerFoodDropPageRoutingModule
  ],
  declarations: [VolunteerFoodDropPage]
})
export class VolunteerFoodDropPageModule {}
