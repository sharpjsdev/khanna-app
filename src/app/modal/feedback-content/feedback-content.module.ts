import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackContentPageRoutingModule } from './feedback-content-routing.module';

import { FeedbackContentPage } from './feedback-content.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackContentPageRoutingModule
  ],
  declarations: [FeedbackContentPage]
})
export class FeedbackContentPageModule {}
