import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../storage.service';
import { 
  ModalController
  } from '@ionic/angular';
@Component({
  selector: 'app-donate-later-msg',
  templateUrl: './donate-later-msg.page.html',
  styleUrls: ['./donate-later-msg.page.scss'],
})
export class DonateLaterMsgPage implements OnInit {
  model:any={};
  constructor(
    private modalController: ModalController,
    private storage: StorageService,
  ) { }

  ngOnInit() {
    var lang_code = JSON.parse(localStorage.getItem('lang'));
    let res = this.storage.getScope();
    let item1 = res.find(i => i.key_text === 'THANKYOU');
    this.model.key_text1 = item1[lang_code];
    let item2 = res.find(i => i.key_text === 'DONATE_LATER_1');
    this.model.key_text2 = item2[lang_code];
  }
  async redirectToNext(){
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
