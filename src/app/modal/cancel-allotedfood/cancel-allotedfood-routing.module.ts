import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelAllotedfoodPage } from './cancel-allotedfood.page';

const routes: Routes = [
  {
    path: '',
    component: CancelAllotedfoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelAllotedfoodPageRoutingModule {}
