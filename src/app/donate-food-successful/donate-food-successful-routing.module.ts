import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonateFoodSuccessfulPage } from './donate-food-successful.page';

const routes: Routes = [
  {
    path: '',
    component: DonateFoodSuccessfulPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonateFoodSuccessfulPageRoutingModule {}
