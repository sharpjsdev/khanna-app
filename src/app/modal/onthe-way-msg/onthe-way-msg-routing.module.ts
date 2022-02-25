import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OntheWayMsgPage } from './onthe-way-msg.page';

const routes: Routes = [
  {
    path: '',
    component: OntheWayMsgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OntheWayMsgPageRoutingModule {}
