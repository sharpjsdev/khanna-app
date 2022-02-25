import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OntheWayMsgPageRoutingModule } from './onthe-way-msg-routing.module';

import { OntheWayMsgPage } from './onthe-way-msg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OntheWayMsgPageRoutingModule
  ],
  declarations: [OntheWayMsgPage]
})
export class OntheWayMsgPageModule {}
