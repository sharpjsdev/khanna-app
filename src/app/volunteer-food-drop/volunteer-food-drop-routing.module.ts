import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteerFoodDropPage } from './volunteer-food-drop.page';

const routes: Routes = [
  {
    path: '',
    component: VolunteerFoodDropPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolunteerFoodDropPageRoutingModule {}
