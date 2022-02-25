import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RejectGetFoodRequestPageRoutingModule } from './reject-get-food-request-routing.module';

import { RejectGetFoodRequestPage } from './reject-get-food-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RejectGetFoodRequestPageRoutingModule
  ],
  declarations: [RejectGetFoodRequestPage]
})
export class RejectGetFoodRequestPageModule {}
