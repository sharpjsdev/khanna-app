import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivityNormalPage } from './activity-normal.page';

const routes: Routes = [
  {
    path: '',
    component: ActivityNormalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityNormalPageRoutingModule {}
