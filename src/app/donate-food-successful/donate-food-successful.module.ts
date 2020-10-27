import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonateFoodSuccessfulPageRoutingModule } from './donate-food-successful-routing.module';

import { DonateFoodSuccessfulPage } from './donate-food-successful.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonateFoodSuccessfulPageRoutingModule
  ],
  declarations: [DonateFoodSuccessfulPage]
})
export class DonateFoodSuccessfulPageModule {}
