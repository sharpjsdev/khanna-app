import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedAddressesEditPageRoutingModule } from './saved-addresses-edit-routing.module';

import { SavedAddressesEditPage } from './saved-addresses-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedAddressesEditPageRoutingModule
  ],
  declarations: [SavedAddressesEditPage]
})
export class SavedAddressesEditPageModule {}
