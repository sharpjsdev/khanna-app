import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelAllotedfoodPageRoutingModule } from './cancel-allotedfood-routing.module';

import { CancelAllotedfoodPage } from './cancel-allotedfood.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelAllotedfoodPageRoutingModule
  ],
  declarations: [CancelAllotedfoodPage]
})
export class CancelAllotedfoodPageModule {}
