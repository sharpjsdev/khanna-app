import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Platform } from '@ionic/angular';

declare var $: any;

@Component({
  selector: 'app-saved-addresses',
  templateUrl: './saved-addresses.page.html',
  styleUrls: ['./saved-addresses.page.scss'],
})
export class SavedAddressesPage implements OnInit {
model:any={};
  constructor(private storage:StorageService, private http: HttpClient,private route: ActivatedRoute,private router: Router,private fetch: FetchService,private platform: Platform) {
	this.platform.backButton.subscribeWithPriority(10, () => {
		this.router.navigate(['/home']);
	});
  }

   ngOnInit() {
   }
  ionViewWillEnter(){
	$(".t").hide();
	$("#view_location_spinner").show();
	this.model.key_page_name = 'Saved Addresses';
	this.model.key_text1 = 'Edit';
	this.model.key_text2 = 'Remove';
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	//this.fetch.getKeyText(lang_code).subscribe(res => {
		let res = this.storage.getScope();
		let item1 = res.find(i => i.key_text === 'SAVED_ADDRESSES');
			this.model.key_page_name = item1[lang_code];
		let item2 = res.find(i => i.key_text === 'EDIT');
			this.model.key_text1 = item2[lang_code];
		let item3 = res.find(i => i.key_text === 'REMOVE');
			this.model.key_text2 = item3[lang_code];
		let item4 = res.find(i => i.key_text === 'SAVE_CHANGES');
			this.model.key_text4 = item4[lang_code]; 
		let item5 = res.find(i => i.key_text === 'ARE_YOU_SURE');
			this.model.key_text5 = item5[lang_code];
		let item6 = res.find(i => i.key_text === 'NO_SAVED_ADDRESS');
			this.model.key_text6 = item6[lang_code];	 
			
	//});
	var app_user_id = JSON.parse(localStorage.getItem('user_registerd'));
	this.fetch.get_user_locations(app_user_id).subscribe(res => {
		$("#view_location_spinner").hide();
		if(res['success'] == true){
			$(".t").show();
			$(".no_adress").css("display","none");
			this.model.data = res['data']; 
		}
	});
  }
  remove(id){
	if(confirm(this.model.key_text5+' ?')){
		$("#add_"+id).hide();
		this.fetch.remove_location(id).subscribe(res => {
		});	
	}
  }
  saveChanges(){
	  this.ionViewWillEnter();
  }
}
