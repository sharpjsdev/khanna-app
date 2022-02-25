import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessDeliverModalPageRoutingModule } from './success-deliver-modal-routing.module';

import { SuccessDeliverModalPage } from './success-deliver-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessDeliverModalPageRoutingModule
  ],
  declarations: [SuccessDeliverModalPage]
})
export class SuccessDeliverModalPageModule {}
