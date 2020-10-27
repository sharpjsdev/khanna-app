import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteerLocationPage } from './volunteer-location.page';

const routes: Routes = [
  {
    path: '',
    component: VolunteerLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolunteerLocationPageRoutingModule {}
