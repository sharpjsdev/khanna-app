import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliverFoodVolunteerPage } from './deliver-food-volunteer.page';

const routes: Routes = [
  {
    path: '',
    component: DeliverFoodVolunteerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliverFoodVolunteerPageRoutingModule {}
