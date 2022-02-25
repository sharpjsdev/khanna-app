import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnTheWaySearchPage } from './on-the-way-search.page';

const routes: Routes = [
  {
    path: '',
    component: OnTheWaySearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnTheWaySearchPageRoutingModule {}
