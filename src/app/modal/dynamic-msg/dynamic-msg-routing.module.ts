import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DynamicMsgPage } from './dynamic-msg.page';

const routes: Routes = [
  {
    path: '',
    component: DynamicMsgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DynamicMsgPageRoutingModule {}
