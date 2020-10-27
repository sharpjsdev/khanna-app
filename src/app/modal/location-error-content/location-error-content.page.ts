import { Component, OnInit } from '@angular/core';
import { FetchService } from '../../fetch.service';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';

@Component({
  selector: 'app-location-error-content',
  templateUrl: './location-error-content.page.html',
  styleUrls: ['./location-error-content.page.scss'],
})
export class LocationErrorContentPage implements OnInit {
model:any={};
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
	private fetch: FetchService
  ) { }

  ngOnInit() {
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	this.fetch.getKeyText(lang_code).subscribe(res => {
		let item1 = res.find(i => i.key_text === 'KINDLY_SET_YOUR_CURRENT_LOCATION_TO_CONTINUE');
			this.model.key_text1 = item1[lang_code];
	});
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}
