import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SortContentPageRoutingModule } from './sort-content-routing.module';

import { SortContentPage } from './sort-content.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SortContentPageRoutingModule
  ],
  declarations: [SortContentPage]
})
export class SortContentPageModule {}
