import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonSearchScreenPage } from './common-search-screen.page';

const routes: Routes = [
  {
    path: '',
    component: CommonSearchScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonSearchScreenPageRoutingModule {}
