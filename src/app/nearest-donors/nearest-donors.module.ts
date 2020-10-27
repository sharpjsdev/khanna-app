import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NearestDonorsPageRoutingModule } from './nearest-donors-routing.module';

import { NearestDonorsPage } from './nearest-donors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NearestDonorsPageRoutingModule
  ],
  declarations: [NearestDonorsPage]
})
export class NearestDonorsPageModule {}
