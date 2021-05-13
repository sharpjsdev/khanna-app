import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiverConfirmPageRoutingModule } from './receiver-confirm-routing.module';

import { ReceiverConfirmPage } from './receiver-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiverConfirmPageRoutingModule
  ],
  declarations: [ReceiverConfirmPage]
})
export class ReceiverConfirmPageModule {}
