import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchingVolunteerPageRoutingModule } from './searching-volunteer-routing.module';

import { SearchingVolunteerPage } from './searching-volunteer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchingVolunteerPageRoutingModule
  ],
  declarations: [SearchingVolunteerPage]
})
export class SearchingVolunteerPageModule {}
