import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreenAfterVolunteerNotFoundPage } from './screen-after-volunteer-not-found.page';

const routes: Routes = [
  {
    path: '',
    component: ScreenAfterVolunteerNotFoundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreenAfterVolunteerNotFoundPageRoutingModule {}
