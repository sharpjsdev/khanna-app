import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentLocationContentPageRoutingModule } from './current-location-content-routing.module';

import { CurrentLocationContentPage } from './current-location-content.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentLocationContentPageRoutingModule
  ],
  declarations: [CurrentLocationContentPage]
})
export class CurrentLocationContentPageModule {}
