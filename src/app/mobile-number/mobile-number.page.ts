import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';
declare var FCMPlugin:any;
declare var $: any;
declare var device:any;
@Component({
  selector: 'app-mobile-number',
  templateUrl: './mobile-number.page.html',
  styleUrls: ['./mobile-number.page.scss'],
})
export class MobileNumberPage implements OnInit {
model:any={};
next_btn:any={};
app_title:any;
page_key1:any;
page_key2:any;
mobile_no:any;
alert_text:any;
okay:any;
  constructor(private storage:StorageService, private http: HttpClient,private route: ActivatedRoute,private router: Router,private fetch: FetchService,public alertController: AlertController) { }

  ngOnInit() {
	
  }

  ionViewWillEnter(){
	this.next_btn = 'Next';
	this.app_title = 'Khanaa.app';
	this.page_key1 = 'Enter your Mobile No.';
	this.page_key2 = 'for verification';
	this.mobile_no = 'Mobile No.';
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	//this.fetch.getKeyText(lang_code).subscribe(res => {
		let res = this.storage.getScope();
	let item1 = res.find(i => i.key_text === 'NEXT');
		this.next_btn = item1[lang_code];
	let item2 = res.find(i => i.key_text === 'KHANAA_APP');
		this.app_title = item2[lang_code];
	let item3 = res.find(i => i.key_text === 'ENTER_YOUR_MOBILE_NO.');
		this.page_key1 = item3[lang_code];
	let item4 = res.find(i => i.key_text === 'FOR_VERIFICATION');
		this.page_key2 = item4[lang_code];
	let item5 = res.find(i => i.key_text === 'MOBILE_NO');
		this.mobile_no = item5[lang_code];
	let item6 = res.find(i => i.key_text === 'PLEASE_ENTER_MOBILE_NUMBER');
		this.alert_text = item6[lang_code];
	let item7 = res.find(i => i.key_text === 'OKAY');
		this.okay = item7[lang_code];
	//});

	document.addEventListener('deviceready', () => {
		FCMPlugin.getToken((token: any) => {
			
			localStorage.setItem('device_token', JSON.stringify(token));
			
		  });
		 
	  });
  }
  check_no(value){
	console.log(value);
	var no = $('.check_number').val();
	if(no.length==10){
		$('.green_check').css('display','block');
		this.model.mobile_no = no;
	}else{
		$('.green_check').css('display','none');
		this.model.mobile_no = null;
	}
  }
  save(){

	if(this.model.mobile_no != null){
		let token = localStorage.getItem('device_token');
		let platform = '';
		document.addEventListener('deviceready', () => {
			platform = device.platform;
		});
		let data = JSON.stringify({'mobile_no':this.model.mobile_no,'device_token':token,'platform':platform});
		console.log(data);
		this.fetch.createUser(data).subscribe(res => {
			console.log(res);
			localStorage.setItem('user_id', JSON.stringify(res['user_id']));
			localStorage.setItem('user_mobile', JSON.stringify(this.model.mobile_no));
			localStorage.setItem('otp', JSON.stringify(res['otp']));
			localStorage.setItem('isotpverified', '0');
			$('.check_number').val('');
			this.router.navigate(['/otp']);
		});
	}else{
		this.presentAlert();
	}
  }
async presentAlert() {
		const alert = await this.alertController.create({
		  cssClass: 'my-custom-class',
		  header: this.alert_text,
		  buttons: [this.okay]
		});

		await alert.present();
	  }
}
