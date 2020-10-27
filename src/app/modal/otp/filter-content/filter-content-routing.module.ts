import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterContentPage } from './filter-content.page';

const routes: Routes = [
  {
    path: '',
    component: FilterContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterContentPageRoutingModule {}
