import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnTheWayAddressPage } from './on-the-way-address.page';

const routes: Routes = [
  {
    path: '',
    component: OnTheWayAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnTheWayAddressPageRoutingModule {}
