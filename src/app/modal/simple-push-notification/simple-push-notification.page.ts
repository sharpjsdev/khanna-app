import { Component, OnInit , Input} from '@angular/core';
import { StorageService } from '../../storage.service';
import { FetchService } from '../../fetch.service';

import { 
  ModalController,
  NavParams 
  } from '@ionic/angular';

@Component({
  selector: 'app-simple-push-notification',
  templateUrl: './simple-push-notification.page.html',
  styleUrls: ['./simple-push-notification.page.scss'],
})
export class SimplePushNotificationPage implements OnInit {
  @Input() msg;
  model:any={};
  constructor(
    private storage: StorageService,
    private fetch: FetchService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.model.key_text1 = "okay";
    var lang_code = JSON.parse(localStorage.getItem('lang'));
    let res = this.storage.getScope();
    let item1 = res.find(i => i.key_text === 'OKAY');
      this.model.key_text1 = item1[lang_code]; 
  }
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss('');
  }
}
