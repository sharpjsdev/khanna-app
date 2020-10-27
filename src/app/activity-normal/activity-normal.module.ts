import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityNormalPageRoutingModule } from './activity-normal-routing.module';

import { ActivityNormalPage } from './activity-normal.page';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	PipesModule,
    ActivityNormalPageRoutingModule
  ],
  declarations: [ActivityNormalPage]
})
export class ActivityNormalPageModule {}
