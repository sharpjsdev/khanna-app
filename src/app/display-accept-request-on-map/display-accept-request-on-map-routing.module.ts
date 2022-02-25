import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayAcceptRequestOnMapPage } from './display-accept-request-on-map.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayAcceptRequestOnMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayAcceptRequestOnMapPageRoutingModule {}
