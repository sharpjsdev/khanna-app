import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseDonateOptionPage } from './choose-donate-option.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseDonateOptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseDonateOptionPageRoutingModule {}
