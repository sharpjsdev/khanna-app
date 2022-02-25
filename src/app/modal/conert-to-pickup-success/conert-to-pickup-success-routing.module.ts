import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConertToPickupSuccessPage } from './conert-to-pickup-success.page';

const routes: Routes = [
  {
    path: '',
    component: ConertToPickupSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConertToPickupSuccessPageRoutingModule {}
