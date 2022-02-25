import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtactPinPageRoutingModule } from './extact-pin-routing.module';

import { ExtactPinPage } from './extact-pin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExtactPinPageRoutingModule
  ],
  declarations: [ExtactPinPage]
})
export class ExtactPinPageModule {}
