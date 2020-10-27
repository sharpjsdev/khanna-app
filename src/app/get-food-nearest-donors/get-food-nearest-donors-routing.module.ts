import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetFoodNearestDonorsPage } from './get-food-nearest-donors.page';

const routes: Routes = [
  {
    path: '',
    component: GetFoodNearestDonorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetFoodNearestDonorsPageRoutingModule {}
