import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedAddressesAddPage } from './saved-addresses-add.page';

const routes: Routes = [
  {
    path: '',
    component: SavedAddressesAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedAddressesAddPageRoutingModule {}
