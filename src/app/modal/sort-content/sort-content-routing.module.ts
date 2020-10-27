import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SortContentPage } from './sort-content.page';

const routes: Routes = [
  {
    path: '',
    component: SortContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SortContentPageRoutingModule {}
