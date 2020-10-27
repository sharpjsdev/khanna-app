import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonateFoodAddLocationPageRoutingModule } from './donate-food-add-location-routing.module';

import { DonateFoodAddLocationPage } from './donate-food-add-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonateFoodAddLocationPageRoutingModule
  ],
  declarations: [DonateFoodAddLocationPage]
})
export class DonateFoodAddLocationPageModule {}
