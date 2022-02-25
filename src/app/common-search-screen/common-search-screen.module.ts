import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommonSearchScreenPageRoutingModule } from './common-search-screen-routing.module';

import { CommonSearchScreenPage } from './common-search-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonSearchScreenPageRoutingModule
  ],
  declarations: [CommonSearchScreenPage]
})
export class CommonSearchScreenPageModule {}
