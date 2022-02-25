import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtactPinPage } from './extact-pin.page';

const routes: Routes = [
  {
    path: '',
    component: ExtactPinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtactPinPageRoutingModule {}
