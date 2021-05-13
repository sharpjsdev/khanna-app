import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowInBetweenPage } from './show-in-between.page';

const routes: Routes = [
  {
    path: '',
    component: ShowInBetweenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowInBetweenPageRoutingModule {}
