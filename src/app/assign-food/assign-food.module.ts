import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignFoodPageRoutingModule } from './assign-food-routing.module';

import { AssignFoodPage } from './assign-food.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignFoodPageRoutingModule
  ],
  declarations: [AssignFoodPage]
})
export class AssignFoodPageModule {}
