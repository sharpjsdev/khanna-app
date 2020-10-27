import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationErrorContentPageRoutingModule } from './location-error-content-routing.module';

import { LocationErrorContentPage } from './location-error-content.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationErrorContentPageRoutingModule
  ],
  declarations: [LocationErrorContentPage]
})
export class LocationErrorContentPageModule {}
