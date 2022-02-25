import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseScreenAfterRejectPage } from './choose-screen-after-reject.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseScreenAfterRejectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseScreenAfterRejectPageRoutingModule {}
