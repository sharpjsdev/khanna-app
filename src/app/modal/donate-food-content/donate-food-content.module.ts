import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonateFoodContentPageRoutingModule } from './donate-food-content-routing.module';

import { DonateFoodContentPage } from './donate-food-content.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonateFoodContentPageRoutingModule
  ],
  declarations: [DonateFoodContentPage]
})
export class DonateFoodContentPageModule {}
