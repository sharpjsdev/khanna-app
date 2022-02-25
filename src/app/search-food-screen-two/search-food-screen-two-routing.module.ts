import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchFoodScreenTwoPage } from './search-food-screen-two.page';

const routes: Routes = [
  {
    path: '',
    component: SearchFoodScreenTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchFoodScreenTwoPageRoutingModule {}
