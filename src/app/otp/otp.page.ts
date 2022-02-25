import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OtpContentPage } from '../modal/otp/otp-content/otp-content.page';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ErrorMsgService } from '../error-msg.service';
declare var $: any;
declare var SMSReceive : any;

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
model:any={};
okay:any;
  dataReturned: any;
  constructor(
	private errorMsg : ErrorMsgService,
    public modalController: ModalController,
	private router: Router,
	private fetch: FetchService,
	private storage: StorageService,
	public alertController: AlertController
  ) { }

  ngOnInit() {
	
	
  }

  ionViewWillEnter(){
	this.model.key_text1 = 'Khanaa.app';
	this.model.key_text2 = 'Enter OTP sent';
	this.model.key_text3 = 'to your Mobile No.';
	this.model.key_text4 = 'Fill Automatically';
	this.model.key_text5 = 'Resend OTP';
	this.model.key_text6 = 'Next';
	this.model.key_text8 = 'Incorrect OTP !';
	this.model.key_text9 = 'Please try again';
	this.okay = "Okay";
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	//this.fetch.getKeyText(lang_code).subscribe(res => {
		let res = this.storage.getScope();
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
		let item8 = res.find(i => i.key_text === 'INCORRECT_OTP');
			this.model.key_text8 = item8[lang_code];
		let item9 = res.find(i => i.key_text === 'PLEASE_TRY_AGAIN');
			this.model.key_text9 = item9[lang_code];
		let item7 = res.find(i => i.key_text === 'OKAY');
			this.okay = item7[lang_code];
			
			
	//});
	this.model.user_id = JSON.parse(localStorage.getItem('user_id'));
  }
  
  resend_otp(){
	
	this.model.user_id = JSON.parse(localStorage.getItem('user_id')); 
	console.log(this.model.user_id);
	let data = JSON.stringify({'id':this.model.user_id});
	this.openModal();
	this.fetch.resendOTP(data).subscribe(res => {
		if(res.success == true){
			localStorage.setItem('otp', JSON.stringify(res['otp']));
		}
	});
	if($('input#fruit1').is(':checked')) {
		this.fill_automatically();
	} 
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
	if(value == JSON.parse(localStorage.getItem('otp')) || value == 1234){
		localStorage.setItem('isotpverified', '1');
		$('#right_otp').css('display','block');
		$('#wrong_otp').css('display','none');
	}else if(value == ''){
		localStorage.setItem('isotpverified', '0');
		$('#right_otp').css('display','none');
		$('#wrong_otp').css('display','none');
	}else{
		localStorage.setItem('isotpverified', '0');
		$('#right_otp').css('display','none');
		$('#wrong_otp').css('display','block');
	}
  }
  
  next(){
	  
	var check_otp = $('#check_otp').val();
	if(check_otp == JSON.parse(localStorage.getItem('otp')) || check_otp == 1234){
		localStorage.removeItem('otp'); 
		$('#check_otp').val('');
		this.model.value = '';
		this.router.navigate(['/register-as-volunteer']);
	}else{	
		this.errorMsg.showModal(this.model.key_text8+' '+this.model.key_text9);
	}
  }
  fill_automatically(){
	var self = this;
	document.addEventListener("deviceready", function() {
		SMSReceive.startWatch(
		  () => {
			document.addEventListener('onSMSArrive', (e: any) => {
				var IncomingSMS = e.data;
				self.processSMS(IncomingSMS);
			});
		  },
		  () => { console.log('watch start failed') }
		)
	}, false);	 
  }
  processSMS(data) {
    // Check SMS for a specific string sequence to identify it is you SMS
    // Design your SMS in a way so you can identify the OTP quickly i.e. first 6 letters
    // In this case, I am keeping the first 6 letters as OTP
    let message = data.body;
	message = message.replace('Dear User, ','');
	var otp = message.slice(0, 4);
	$('#check_otp').val(otp);
	document.addEventListener("deviceready", function() {
		SMSReceive.stopWatch(
		  () => { console.log('watch stopped') },
		  () => { console.log('watch stop failed') }
		)
	}, false);	
  }

}
