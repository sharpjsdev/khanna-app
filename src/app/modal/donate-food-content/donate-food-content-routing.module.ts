import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonateFoodContentPage } from './donate-food-content.page';

const routes: Routes = [
  {
    path: '',
    component: DonateFoodContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonateFoodContentPageRoutingModule {}
