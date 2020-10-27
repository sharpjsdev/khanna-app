import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetFoodSearchPage } from './get-food-search.page';

const routes: Routes = [
  {
    path: '',
    component: GetFoodSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetFoodSearchPageRoutingModule {}
