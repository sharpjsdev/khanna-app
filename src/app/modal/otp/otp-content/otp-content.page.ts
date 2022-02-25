import { Component, OnInit } from '@angular/core';
import { FetchService } from '../../../fetch.service';
import { StorageService } from '../../../storage.service';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';

@Component({
  selector: 'app-otp-content',
  templateUrl: './otp-content.page.html',
  styleUrls: ['./otp-content.page.scss'],
})
export class OtpContentPage implements OnInit {
model:any={};
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
	private fetch: FetchService,
  private Storage: StorageService
  ) { }

  ngOnInit() {
	 this.model.mobile_no = JSON.parse(localStorage.getItem('user_mobile'));
	 this.model.key_text1 = 'New OTP has been sent to your mobile number. ';
	 this.model.key_text2 = 'New OTP has been sent to your mobile number.';
	 var lang_code = JSON.parse(localStorage.getItem('lang'));
	 //this.fetch.getKeyText(lang_code).subscribe(res => {
     let res = this.Storage.getScope();
		 let item1 = res.find(i => i.key_text === 'NEW_OTP_HAS_BEEN');
			this.model.key_text1 = item1[lang_code];
		let item2 = res.find(i => i.key_text === 'NEW_OTP_HAS_BEEN_SENT_TO_YOUR_MOBILE_NO');
			this.model.key_text2 = item2[lang_code];
	// });
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}
