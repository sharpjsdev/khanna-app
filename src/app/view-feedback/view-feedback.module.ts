import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFeedbackPageRoutingModule } from './view-feedback-routing.module';

import { ViewFeedbackPage } from './view-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewFeedbackPageRoutingModule
  ],
  declarations: [ViewFeedbackPage]
})
export class ViewFeedbackPageModule {}
