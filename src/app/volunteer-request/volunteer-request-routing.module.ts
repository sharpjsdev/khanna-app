import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteerRequestPage } from './volunteer-request.page';

const routes: Routes = [
  {
    path: '',
    component: VolunteerRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolunteerRequestPageRoutingModule {}
