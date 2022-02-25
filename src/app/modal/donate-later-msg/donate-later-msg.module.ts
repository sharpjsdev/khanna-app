import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonateLaterMsgPageRoutingModule } from './donate-later-msg-routing.module';

import { DonateLaterMsgPage } from './donate-later-msg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonateLaterMsgPageRoutingModule
  ],
  declarations: [DonateLaterMsgPage]
})
export class DonateLaterMsgPageModule {}
