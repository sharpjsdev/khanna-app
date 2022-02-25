import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetFoodNearestDonorsTwoDuplicatePage } from './get-food-nearest-donors-two-duplicate.page';

const routes: Routes = [
  {
    path: '',
    component: GetFoodNearestDonorsTwoDuplicatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetFoodNearestDonorsTwoDuplicatePageRoutingModule {}
