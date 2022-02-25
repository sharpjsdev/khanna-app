import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchingVolunteerPage } from './searching-volunteer.page';

const routes: Routes = [
  {
    path: '',
    component: SearchingVolunteerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchingVolunteerPageRoutingModule {}
