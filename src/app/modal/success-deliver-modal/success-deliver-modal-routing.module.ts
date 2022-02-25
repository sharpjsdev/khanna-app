import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessDeliverModalPage } from './success-deliver-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessDeliverModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessDeliverModalPageRoutingModule {}
