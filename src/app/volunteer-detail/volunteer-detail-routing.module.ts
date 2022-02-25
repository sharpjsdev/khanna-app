import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteerDetailPage } from './volunteer-detail.page';

const routes: Routes = [
  {
    path: '',
    component: VolunteerDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolunteerDetailPageRoutingModule {}
