import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonateFoodAddLocationPage } from './donate-food-add-location.page';

const routes: Routes = [
  {
    path: '',
    component: DonateFoodAddLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonateFoodAddLocationPageRoutingModule {}
