import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonateLaterMsgPage } from './donate-later-msg.page';

const routes: Routes = [
  {
    path: '',
    component: DonateLaterMsgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonateLaterMsgPageRoutingModule {}
