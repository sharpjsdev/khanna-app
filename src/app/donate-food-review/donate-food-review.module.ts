import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonateFoodReviewPageRoutingModule } from './donate-food-review-routing.module';

import { DonateFoodReviewPage } from './donate-food-review.page';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	PipesModule,
    DonateFoodReviewPageRoutingModule
  ],
  declarations: [DonateFoodReviewPage]
})
export class DonateFoodReviewPageModule {}
