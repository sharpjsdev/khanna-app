import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeContentPageRoutingModule } from './home-content-routing.module';

import { HomeContentPage } from './home-content.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeContentPageRoutingModule
  ],
  declarations: [HomeContentPage]
})
export class HomeContentPageModule {}
