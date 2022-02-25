import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteerFoodRequestContentPage } from './volunteer-food-request-content.page';

const routes: Routes = [
  {
    path: '',
    component: VolunteerFoodRequestContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolunteerFoodRequestContentPageRoutingModule {}
