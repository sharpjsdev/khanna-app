import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonateFoodReviewPage } from './donate-food-review.page';

const routes: Routes = [
  {
    path: '',
    component: DonateFoodReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonateFoodReviewPageRoutingModule {}
