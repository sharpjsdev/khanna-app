import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedAddressesPageRoutingModule } from './saved-addresses-routing.module';

import { SavedAddressesPage } from './saved-addresses.page';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	PipesModule,
    SavedAddressesPageRoutingModule
  ],
  declarations: [SavedAddressesPage]
})
export class SavedAddressesPageModule {}
