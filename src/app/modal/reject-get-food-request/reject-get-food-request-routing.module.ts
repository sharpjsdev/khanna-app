import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RejectGetFoodRequestPage } from './reject-get-food-request.page';

const routes: Routes = [
  {
    path: '',
    component: RejectGetFoodRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RejectGetFoodRequestPageRoutingModule {}
