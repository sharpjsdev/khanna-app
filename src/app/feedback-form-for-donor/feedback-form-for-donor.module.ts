import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackFormForDonorPageRoutingModule } from './feedback-form-for-donor-routing.module';

import { FeedbackFormForDonorPage } from './feedback-form-for-donor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackFormForDonorPageRoutingModule
  ],
  declarations: [FeedbackFormForDonorPage]
})
export class FeedbackFormForDonorPageModule {}
