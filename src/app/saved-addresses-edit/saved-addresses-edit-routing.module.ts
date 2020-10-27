import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedAddressesEditPage } from './saved-addresses-edit.page';

const routes: Routes = [
  {
    path: '',
    component: SavedAddressesEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedAddressesEditPageRoutingModule {}
