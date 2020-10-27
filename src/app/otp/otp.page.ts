import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OtpContentPage } from '../modal/otp/otp-content/otp-content.page';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
model:any={};
  dataReturned: any;
  constructor(
    public modalController: ModalController,
	private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService
  ) { }

  ngOnInit() {
	this.model.key_text1 = 'Khanaa.app';
	this.model.key_text2 = 'Enter OTP sent';
	this.model.key_text3 = 'to your Mobile No.';
	this.model.key_text4 = 'Fill Automatically';
	this.model.key_text5 = 'Resend OTP';
	this.model.key_text6 = 'Next';
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	this.fetch.getKeyText(lang_code).subscribe(res => {
		let item1 = res.find(i => i.key_text === 'NEXT');
			this.model.key_text6 = item1[lang_code];
		let item2 = res.find(i => i.key_text === 'KHANAA_APP');
			this.model.key_text1 = item2[lang_code];
		let item3 = res.find(i => i.key_text === 'ENTER_OTP_SENT');
			this.model.key_text2 = item3[lang_code];
		let item4 = res.find(i => i.key_text === 'TO_YOUR_MOBILE_NO.');
			this.model.key_text3 = item4[lang_code];
		let item5 = res.find(i => i.key_text === 'FILL_AUTOMATICALLY');
			this.model.key_text4 = item5[lang_code];
		let item6 = res.find(i => i.key_text === 'RESEND_OTP');
			this.model.key_text5 = item6[lang_code];
			
	});
	this.model.user_id = JSON.parse(localStorage.getItem('user_registerd')); 
  }
  
  resend_otp(){
	let data = JSON.stringify({'id':this.model.user_id});
	this.openModal();
	this.fetch.resendOTP(data).subscribe(res => {
		console.log(res);
		if(res.success == true){
			localStorage.setItem('otp', JSON.stringify(res['otp']));
		}
	});
  }

  async openModal() {
    const modal = await this.modalController.create({
		component: OtpContentPage,
		cssClass: 'custom_otp_modal',
		componentProps: {
			"paramID": 123,
			"paramTitle": "Test Title"
		}
    });

    modal.onDidDismiss().then((dataReturned) => {
		if (dataReturned !== null) {
			this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
		}
    });

    return await modal.present();
  }
  check_otp(value){
	if(value == JSON.parse(localStorage.getItem('otp'))){
		$('#right').css('display','block');
		$('#wrong').css('display','none');
	}else if(value == ''){
		$('#right').css('display','none');
		$('#wrong').css('display','none');
	}else{
		$('#right').css('display','none');
		$('#wrong').css('display','block');
	}
  }
  
  next(){
	var check_otp = $('#check_otp').val();
	if(check_otp == JSON.parse(localStorage.getItem('otp'))){
		localStorage.removeItem('otp'); 
		$('#check_otp').val('');
		this.router.navigate(['/register-as-volunteer']);
	}
  }

}
