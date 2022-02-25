import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController, MenuController, Platform } from "@ionic/angular";

declare var $ :any;
@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {
model:any={};
next_btn:any={};
  constructor(private http: HttpClient,private route: ActivatedRoute,private router: Router,private fetch: FetchService,public alertController: AlertController,public navCtrl: NavController) {
	
	if(JSON.parse(localStorage.getItem('user_registerd')) != null){
		this.fetch.isLanguageChanged.next(JSON.parse(localStorage.getItem('lang')));
		this.router.navigate(['/home']);
		//this.navCtrl.navigateBack(['/home']);
	}else if(JSON.parse(localStorage.getItem('user_id')) != null && localStorage.getItem('isotpverified') == '1'){
		this.fetch.isLanguageChanged.next(JSON.parse(localStorage.getItem('lang')));
		this.router.navigate(['/register-as-volunteer']);
		//this.navCtrl.navigateBack(['/register-as-volunteer']);
	}else if(localStorage.getItem('isotpverified') == '0'){
		this.router.navigate(['/otp']);
	}
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
	this.model.search = false;
	  if(this.model.language){
		localStorage.setItem('lang', JSON.stringify(this.model.language));
	  }
	this.next_btn = 'Next';
	this.fetch.getLanguage().subscribe(res => {
		this.model.lang_data = res;
	});
  }
  select_lang(value){
	localStorage.setItem('lang', JSON.stringify(value.detail.value));
	this.model.language = value.detail.value;
	var lang_code = value.detail.value;
	this.fetch.getKeyText(value.detail.value).subscribe(res => {
		localStorage.setItem('lang_key', JSON.stringify(res));
		let item1 = res.find(i => i.key_text === 'NEXT');
		this.next_btn = item1[lang_code];
	});
  }
  next(){
	this.model.search = true;
	if(JSON.parse(localStorage.getItem('lang')) != null){
		this.fetch.isLanguageChanged.next(JSON.parse(localStorage.getItem('lang')));
		var self = this;
		setTimeout(function(){ 
			self.router.navigate(['/mobile-number']);
		}, 3000);
		
	}else{
		this.presentAlert();
	}
  }
  async presentAlert() {
	const alert = await this.alertController.create({
		cssClass: 'my-custom-class',
		message: 'Please choose a language',
		buttons: ['OK']
	});
	await alert.present();
  }
}
