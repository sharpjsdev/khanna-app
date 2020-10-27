import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Location } from "@angular/common";

declare var $: any;

@Component({
  selector: 'app-choose-language',
  templateUrl: './choose-language.page.html',
  styleUrls: ['./choose-language.page.scss'],
})
export class ChooseLanguagePage implements OnInit {
model:any={};
  constructor(private http: HttpClient,private route: ActivatedRoute,private router: Router,private fetch: FetchService,public alertController: AlertController,private platform: Platform,private location: Location) { 
	this.platform.backButton.subscribeWithPriority(10, () => {
		this.location.back();
	});
  }

   ngOnInit() {
	//localStorage.removeItem('lang'); 
	this.model.lang_code = JSON.parse(localStorage.getItem('lang'));
	console.log(this.model.lang_code);
	$('#choose_lang_'+this.model.lang_code).prop("checked", true);
	this.model.choose_btn = 'Choose Language';
	this.fetch.getLanguage().subscribe(res => {
		this.model.lang_data = res;
	});
  }
  select_lang(value){
	localStorage.setItem('lang', JSON.stringify(value.detail.value));
	var lang_code = value.detail.value;
	this.fetch.getKeyText(value.detail.value).subscribe(res => {
		localStorage.setItem('lang_key', JSON.stringify(res));
		let item1 = res.find(i => i.key_text === 'CHOOSE_LANGUAGE');
			this.model.choose_btn = item1[lang_code];
		});
  }
  choose_lang(){
	if(JSON.parse(localStorage.getItem('lang')) != null){
		this.router.navigate(['/home']);
	}else{
		this.presentAlert();
	}
  }
  async presentAlert() {
	const alert = await this.alertController.create({
		cssClass: 'my-custom-class',
		header: 'Please choose a language',
		buttons: ['OK']
	});
	await alert.present();
  }

}
