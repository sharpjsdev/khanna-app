import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonateFoodPage } from './donate-food.page';

const routes: Routes = [
  {
    path: '',
    component: DonateFoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonateFoodPageRoutingModule {}
