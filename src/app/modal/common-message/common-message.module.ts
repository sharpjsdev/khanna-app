import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommonMessagePageRoutingModule } from './common-message-routing.module';

import { CommonMessagePage } from './common-message.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonMessagePageRoutingModule
  ],
  declarations: [CommonMessagePage]
})
export class CommonMessagePageModule {}
