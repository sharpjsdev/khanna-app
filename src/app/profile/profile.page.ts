import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

model:any={};
  constructor(private http: HttpClient,private route: ActivatedRoute,private router: Router,private fetch: FetchService,public alertController: AlertController,private platform: Platform) { 
	this.platform.backButton.subscribeWithPriority(10, () => {
		this.router.navigate(['/home']);
	});
  }

  ngOnInit() {
	this.model.key_page_name = 'Profile Page';
	this.model.key_username = 'Username';
	this.model.key_dob = 'Date Of Birth';
	this.model.key_food_type = 'Type of food you prefer';
	this.model.key_veg = 'Veg';
	this.model.key_non_veg = 'Non Veg';
	this.model.key_both = 'Both';
	this.model.key_save_changes = 'Save Changes';
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	console.log(lang_code);
	this.fetch.getKeyText(lang_code).subscribe(res => {
		let item1 = res.find(i => i.key_text === 'PROFILE_PAGE');
			this.model.key_page_name = item1[lang_code]; 
		let item2 = res.find(i => i.key_text === 'USERNAME');
			this.model.key_username = item2[lang_code];
		let item3 = res.find(i => i.key_text === 'DATE_OF_BIRTH');
			this.model.key_dob = item3[lang_code];
		let item4 = res.find(i => i.key_text === 'TYPE_OF_FOOD_YOU_PREFER');
			this.model.key_food_type = item4[lang_code];
		let item5 = res.find(i => i.key_text === 'VEG');
			this.model.key_veg = item5[lang_code];
		let item6 = res.find(i => i.key_text === 'NON_VEG');
			this.model.key_non_veg = item6[lang_code];
		let item7 = res.find(i => i.key_text === 'BOTH');
			this.model.key_both = item7[lang_code];
		let item8 = res.find(i => i.key_text === 'SAVE_CHANGES');
			this.model.key_save_changes = item8[lang_code];
	});
	this.model.user_id = JSON.parse(localStorage.getItem('user_registerd'));
	let data = JSON.stringify({'id': this.model.user_id});
	this.fetch.profile(data).subscribe(res => {
		console.log(res);
		this.model.username = res['username'];
		this.model.dob = res['dob'];
		this.model.food_type = res['type_of_food_you_prefer'];
		$('#profile_food_'+res['type_of_food_you_prefer']).addClass('active');
	});
  }
  food_type(val){
	this.model.food_type = val;
	if(val == 1){
		$('#profile_food_'+val).addClass('active');  
		$('#profile_food_2').removeClass('active');  
		$('#profile_food_3').removeClass('active');  
	}else if(val == 2){
		$('#profile_food_'+val).addClass('active');  
		$('#profile_food_1').removeClass('active');  
		$('#profile_food_3').removeClass('active');    
	}else{
		$('#profile_food_'+val).addClass('active');  
		$('#profile_food_2').removeClass('active');  
		$('#profile_food_1').removeClass('active');     
	}
  }
  update_profile(){
	var username = $('#profile_username').val();
	var dob = $('#profile_dob').val();
	let profile_data = JSON.stringify({'id' : this.model.user_id, 'username' : username, 'dob' : dob, 'food_type' : this.model.food_type});
	this.fetch.registerUser(profile_data).subscribe(res => {
		if(res.success == true){
			this.router.navigate(['/home']);
		}
	});
  }

}
