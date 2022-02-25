import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NearByMeLocationPage } from './near-by-me-location.page';

const routes: Routes = [
  {
    path: '',
    component: NearByMeLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NearByMeLocationPageRoutingModule {}
