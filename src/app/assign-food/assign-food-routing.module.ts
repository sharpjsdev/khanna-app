import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignFoodPage } from './assign-food.page';

const routes: Routes = [
  {
    path: '',
    component: AssignFoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignFoodPageRoutingModule {}
