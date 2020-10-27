import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetFoodNearestDonorsTwoPageRoutingModule } from './get-food-nearest-donors-two-routing.module';

import { GetFoodNearestDonorsTwoPage } from './get-food-nearest-donors-two.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetFoodNearestDonorsTwoPageRoutingModule
  ],
  declarations: [GetFoodNearestDonorsTwoPage]
})
export class GetFoodNearestDonorsTwoPageModule {}
