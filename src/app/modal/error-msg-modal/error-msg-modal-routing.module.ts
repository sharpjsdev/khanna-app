import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorMsgModalPage } from './error-msg-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ErrorMsgModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorMsgModalPageRoutingModule {}
