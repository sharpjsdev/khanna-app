import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErrorMsgModalPageRoutingModule } from './error-msg-modal-routing.module';

import { ErrorMsgModalPage } from './error-msg-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErrorMsgModalPageRoutingModule
  ],
  declarations: [ErrorMsgModalPage]
})
export class ErrorMsgModalPageModule {}
