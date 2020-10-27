import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VolunteerPageRoutingModule } from './volunteer-routing.module';

import { VolunteerPage } from './volunteer.page';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	PipesModule,
    VolunteerPageRoutingModule
  ],
  declarations: [VolunteerPage]
})
export class VolunteerPageModule {}
