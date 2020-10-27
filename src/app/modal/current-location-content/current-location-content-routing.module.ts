import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentLocationContentPage } from './current-location-content.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentLocationContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentLocationContentPageRoutingModule {}
