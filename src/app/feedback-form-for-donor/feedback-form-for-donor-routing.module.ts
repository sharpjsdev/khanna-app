import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackFormForDonorPage } from './feedback-form-for-donor.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackFormForDonorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackFormForDonorPageRoutingModule {}
