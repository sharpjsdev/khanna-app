import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetFoodNearestDonorsTwoPage } from './get-food-nearest-donors-two.page';

const routes: Routes = [
  {
    path: '',
    component: GetFoodNearestDonorsTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetFoodNearestDonorsTwoPageRoutingModule {}
