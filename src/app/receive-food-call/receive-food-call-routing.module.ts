import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiveFoodCallPage } from './receive-food-call.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiveFoodCallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiveFoodCallPageRoutingModule {}
