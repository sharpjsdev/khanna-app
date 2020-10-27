import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterContentPageRoutingModule } from './filter-content-routing.module';

import { FilterContentPage } from './filter-content.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterContentPageRoutingModule
  ],
  declarations: [FilterContentPage]
})
export class FilterContentPageModule {} 
