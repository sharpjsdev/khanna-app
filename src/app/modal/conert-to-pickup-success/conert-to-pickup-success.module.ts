import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConertToPickupSuccessPageRoutingModule } from './conert-to-pickup-success-routing.module';

import { ConertToPickupSuccessPage } from './conert-to-pickup-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConertToPickupSuccessPageRoutingModule
  ],
  declarations: [ConertToPickupSuccessPage]
})
export class ConertToPickupSuccessPageModule {}
