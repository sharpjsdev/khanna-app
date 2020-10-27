import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileNumberPage } from './mobile-number.page';

const routes: Routes = [
  {
    path: '',
    component: MobileNumberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileNumberPageRoutingModule {}
