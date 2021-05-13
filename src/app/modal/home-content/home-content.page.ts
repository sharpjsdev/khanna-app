import { Component, OnInit } from '@angular/core';
import { FetchService } from '../../fetch.service';
import { StorageService } from '../../storage.service';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.page.html',
  styleUrls: ['./home-content.page.scss'],
})
export class HomeContentPage implements OnInit {
model:any={};
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
	private fetch: FetchService,
  private storage : StorageService
  ) { }

  ngOnInit() {
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	//this.fetch.getKeyText(lang_code).subscribe(res => {
    let res = this.storage.getScope();
		let item1 = res.find(i => i.key_text === 'VOLUNTEER_THANKYOU1');
			this.model.key_text1 = item1[lang_code];
		let item2 = res.find(i => i.key_text === 'VOLUNTEER_THANKYOU2');
			this.model.key_text2 = item2[lang_code];
		
	//});
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}
