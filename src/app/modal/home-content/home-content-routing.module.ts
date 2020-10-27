import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeContentPage } from './home-content.page';

const routes: Routes = [
  {
    path: '',
    component: HomeContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeContentPageRoutingModule {}
