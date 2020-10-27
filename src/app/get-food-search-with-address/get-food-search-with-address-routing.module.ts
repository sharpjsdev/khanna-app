import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetFoodSearchWithAddressPage } from './get-food-search-with-address.page';

const routes: Routes = [
  {
    path: '',
    component: GetFoodSearchWithAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetFoodSearchWithAddressPageRoutingModule {}
