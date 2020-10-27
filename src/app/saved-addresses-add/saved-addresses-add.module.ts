import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedAddressesAddPageRoutingModule } from './saved-addresses-add-routing.module';

import { SavedAddressesAddPage } from './saved-addresses-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedAddressesAddPageRoutingModule
  ],
  declarations: [SavedAddressesAddPage]
})
export class SavedAddressesAddPageModule {}
