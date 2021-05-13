import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiverConfirmPage } from './receiver-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiverConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiverConfirmPageRoutingModule {}
