import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonateFoodMembersPage } from './donate-food-members.page';

const routes: Routes = [
  {
    path: '',
    component: DonateFoodMembersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonateFoodMembersPageRoutingModule {}
