import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NearestDonorsPage } from './nearest-donors.page';

const routes: Routes = [
  {
    path: '',
    component: NearestDonorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NearestDonorsPageRoutingModule {}
