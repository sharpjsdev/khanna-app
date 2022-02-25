import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnTheWayAddressPageRoutingModule } from './on-the-way-address-routing.module';

import { OnTheWayAddressPage } from './on-the-way-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnTheWayAddressPageRoutingModule
  ],
  declarations: [OnTheWayAddressPage]
})
export class OnTheWayAddressPageModule {}
