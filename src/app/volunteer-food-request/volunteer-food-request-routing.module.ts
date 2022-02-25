import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteerFoodRequestPage } from './volunteer-food-request.page';

const routes: Routes = [
  {
    path: '',
    component: VolunteerFoodRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolunteerFoodRequestPageRoutingModule {}
