import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Location } from "@angular/common";
declare var $: any;

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
model:any={};
  constructor(private storage:StorageService, private http: HttpClient,private route: ActivatedRoute,private router: Router,private fetch: FetchService,private platform: Platform,private location: Location) {
	this.platform.backButton.subscribeWithPriority(10, () => {
		this.location.back();
	});
	  }

  ngOnInit() {
	
  }

  ionViewWillEnter(){
	this.model.key_page_name = 'Help';
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	//this.fetch.getKeyText(lang_code).subscribe(res => {
		let res = this.storage.getScope();
		let item1 = res.find(i => i.key_text === 'HELP');
			this.model.key_page_name = item1[lang_code];
	//});
	this.fetch.help_video(lang_code).subscribe(res => {
		$('#help_spinner').css('display', 'none');
		$('#help_list').css('display', 'block');
		console.log(res);
		this.model.data = res;
	});
  }

}
