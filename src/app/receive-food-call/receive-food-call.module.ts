import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiveFoodCallPageRoutingModule } from './receive-food-call-routing.module';

import { ReceiveFoodCallPage } from './receive-food-call.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiveFoodCallPageRoutingModule
  ],
  declarations: [ReceiveFoodCallPage]
})
export class ReceiveFoodCallPageModule {}
