import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from '../../fetch.service';
import { StorageService } from '../../storage.service';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';
  declare var $:any;

@Component({
  selector: 'app-common-message',
  templateUrl: './common-message.page.html',
  styleUrls: ['./common-message.page.scss'],
})
export class CommonMessagePage implements OnInit {
  model:any={};
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
	  private router: Router,
	  private fetch: FetchService,
    private storage: StorageService
  ) { }

  ngOnInit() {
    var lang_code = JSON.parse(localStorage.getItem('lang'));
		let res = this.storage.getScope();
		let item1 = res.find(i => i.key_text === 'SUCCESS_MSG_1');
			this.model.key_text1 = item1[lang_code];
    let item2 = res.find(i => i.key_text === 'SUCCESS_MSG_2');
			this.model.key_text2 = item2[lang_code];
    let item3 = res.find(i => i.key_text === 'OKAY');
			this.model.key_text3 = item3[lang_code];
  }
  async redirectToNext(){
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
    this.router.navigate(['/home']);
  }
}
