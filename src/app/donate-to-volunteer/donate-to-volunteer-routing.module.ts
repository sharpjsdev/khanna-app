import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonateToVolunteerPage } from './donate-to-volunteer.page';

const routes: Routes = [
  {
    path: '',
    component: DonateToVolunteerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonateToVolunteerPageRoutingModule {}
