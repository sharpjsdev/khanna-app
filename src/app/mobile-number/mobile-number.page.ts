import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ErrorMsgService } from '../error-msg.service';
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
msg:any;
okay:any;
  constructor(private errorMsg:ErrorMsgService,private storage:StorageService, private http: HttpClient,private route: ActivatedRoute,private router: Router,private fetch: FetchService,public alertController: AlertController) { }

  ngOnInit() {
	this.model.mobile_no ='';
  }

  ionViewWillEnter(){
	this.next_btn = 'Next';
	this.app_title = 'Khanaa.app';
	this.page_key1 = 'Enter your Mobile No.';
	this.page_key2 = 'for verification';
	this.mobile_no = 'Mobile No.';
	this.okay = "Okay";
	this.model.verify_mobile = "Please enter a valid 10 digit mobile number";
	this.alert_text =  "Please enter mobile number";
	var lang_code = JSON.parse(localStorage.getItem('lang'));
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
	let item8 = res.find(i => i.key_text === 'VALID_MOBILE_NUMBER');
		this.model.verify_mobile = item8[lang_code];
	//});

	document.addEventListener('deviceready', () => {
		FCMPlugin.getToken((token: any) => {
			
			localStorage.setItem('device_token', JSON.stringify(token));
			
		  });
		 
	  });
  }
  check_no(value){
	var no = $('.check_number').val();
	if(no.length==10){
		$('#right').css('display','block');
		$('#wrong').css('display','none');
		this.model.mobile_no = no;
	}else{
		$('#right').css('display','none');
		$('#wrong').css('display','block');
		this.model.mobile_no = no;
	}
  }
  save(){

	if(this.model.mobile_no.length == 10){
		let token = localStorage.getItem('device_token');
		var lang_code = JSON.parse(localStorage.getItem('lang'));
		let platform = '';
		document.addEventListener('deviceready', () => {
			platform = device.platform;
		});
		let data = JSON.stringify({'mobile_no':this.model.mobile_no,'device_token':token,'platform':platform,'language' : lang_code});
		
		this.fetch.createUser(data).subscribe(res => {
			if(res['success'] == true){
				localStorage.setItem('user_id', JSON.stringify(res['user_id']));
				localStorage.setItem('user_mobile', JSON.stringify(this.model.mobile_no));
				localStorage.setItem('otp', JSON.stringify(res['otp']));
				localStorage.setItem('isotpverified', '0');
				$('.check_number').val('');
				this.router.navigate(['/otp']);
			}else{
				this.errorMsg.showModal(res['message']);
			}
			
		});
	}else if(this.model.mobile_no.length != 10 && this.model.mobile_no != ''){
		this.msg = this.model.verify_mobile;
		this.errorMsg.showModal(this.msg);
	}else{
		this.errorMsg.showModal(this.alert_text);
	}
  }

 
}
