import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NearByMeLocationPageRoutingModule } from './near-by-me-location-routing.module';

import { NearByMeLocationPage } from './near-by-me-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NearByMeLocationPageRoutingModule
  ],
  declarations: [NearByMeLocationPage]
})
export class NearByMeLocationPageModule {}
