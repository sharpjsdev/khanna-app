import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetFoodSearchWithAddressPageRoutingModule } from './get-food-search-with-address-routing.module';

import { GetFoodSearchWithAddressPage } from './get-food-search-with-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetFoodSearchWithAddressPageRoutingModule
  ],
  declarations: [GetFoodSearchWithAddressPage]
})
export class GetFoodSearchWithAddressPageModule {}
