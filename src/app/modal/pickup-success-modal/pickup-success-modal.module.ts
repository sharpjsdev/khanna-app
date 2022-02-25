import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickupSuccessModalPageRoutingModule } from './pickup-success-modal-routing.module';

import { PickupSuccessModalPage } from './pickup-success-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickupSuccessModalPageRoutingModule
  ],
  declarations: [PickupSuccessModalPage]
})
export class PickupSuccessModalPageModule {}
