import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DynamicMsgPageRoutingModule } from './dynamic-msg-routing.module';

import { DynamicMsgPage } from './dynamic-msg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DynamicMsgPageRoutingModule
  ],
  declarations: [DynamicMsgPage]
})
export class DynamicMsgPageModule {}
