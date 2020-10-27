import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationErrorContentPage } from './location-error-content.page';

const routes: Routes = [
  {
    path: '',
    component: LocationErrorContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationErrorContentPageRoutingModule {}
