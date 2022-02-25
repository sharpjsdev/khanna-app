import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service'; 
import { DatePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { TermsConditionsPage } from '../modal/terms-conditions/terms-conditions.page';
import { ErrorMsgService } from '../error-msg.service';
declare var $: any;

@Component({
  selector: 'app-register-as-volunteer',
  templateUrl: './register-as-volunteer.page.html',
  styleUrls: ['./register-as-volunteer.page.scss'],
})
export class RegisterAsVolunteerPage implements OnInit {
model:any={};
app_title:any;
page_key1:any;
page_key2:any;


  constructor(private errorMsg:ErrorMsgService,private storage:StorageService,private fetch: FetchService,public datepipe: DatePipe,public modalController: ModalController) { }

  ngOnInit() {
	this.model.accept = false;
	
  }

  ionViewWillEnter(){
	this.app_title = 'Khanaa.app';
	this.page_key1 = 'Enter your Personal Details';
	this.page_key2 = 'for better experience of the app';
	this.model.username = 'Username';
	this.model.dob = 'Date Of Birth';
	this.model.food_type = 'Type of food you prefer';
	this.model.veg = 'Veg';
	this.model.non_veg = 'Non Veg';
	this.model.both = 'Both';
	this.model.food_val = '';
	this.model.alert_text = 'Please fill all the details';
	this.model.okay = 'okay';
	this.model.get_start = "Get Started";
	this.model.next_btn = 'Next';
	this.model.username_req = 'Username is required';
	this.model.dob_req = 'DOB is required';
	this.model.food_type_req = 'Food type is required';
	let maxDate=  new Date((new Date().getFullYear() - 18),new Date().getMonth(), new Date().getDate());
	let latest_date =this.datepipe.transform(maxDate, 'yyyy-MM-dd');
	this.model.latest_date = latest_date;
    
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	//this.fetch.getKeyText(lang_code).subscribe(res => {
	let res = this.storage.getScope();
	let item1 = res.find(i => i.key_text === 'KHANAA_APP');
		this.app_title = item1[lang_code];
	let item2 = res.find(i => i.key_text === 'ENTER_YOUR_PERSONAL_DETAILS');
		this.page_key1 = item2[lang_code]; 
	let item3 = res.find(i => i.key_text === 'FOR_BETTER_EXPERIENCE_OF_THE_APP');
		this.page_key2 = item3[lang_code];
	let item4 = res.find(i => i.key_text === 'USERNAME');
		this.model.username = item4[lang_code];
	let item5 = res.find(i => i.key_text === 'DATE_OF_BIRTH');
		this.model.dob = item5[lang_code];
	let item6 = res.find(i => i.key_text === 'TYPE_OF_FOOD_YOU_PREFER');
		this.model.food_type = item6[lang_code];
	let item7 = res.find(i => i.key_text === 'VEG');
		this.model.veg = item7[lang_code];
	let item8 = res.find(i => i.key_text === 'NON_VEG');
		this.model.non_veg = item8[lang_code];
	let item9 = res.find(i => i.key_text === 'ANY');
		this.model.both = item9[lang_code];
	let item10 = res.find(i => i.key_text === 'PLEASE_FILL_ALL_THE_DETAILS');
		this.model.alert_text = item10[lang_code];
	let item11 = res.find(i => i.key_text === 'OKAY');
		this.model.okay = item11[lang_code];
	let item12 = res.find(i => i.key_text === 'GET_STARTED');
		this.model.get_start = item12[lang_code];
	let item13 = res.find(i => i.key_text === 'TERMS_CONDITIONS');
		this.model.terms = item13[lang_code];	
	let item14 = res.find(i => i.key_text === 'NEXT');
		this.model.next = item14[lang_code];
	let item15 = res.find(i => i.key_text === 'USERNAME_IS_REQUIRED');
		this.model.username_req = item15[lang_code];
	let item16 = res.find(i => i.key_text === 'DOB_IS_REQUIRED');
		this.model.dob_req = item16[lang_code];
	let item17 = res.find(i => i.key_text === 'FOOD_TYPE_IS_REQUIRED');
		this.model.food_type_req = item17[lang_code];
	//});
	this.model.user_id = JSON.parse(localStorage.getItem('user_id')); 
	if(this.model.user_id != null){
		this.fetch.get_registered_user_data(this.model.user_id).subscribe(res => {
			console.log(res);
			this.model.username_r = res['username']; 
			this.model.dob_r = res['dob'];
			this.model.food_type_r = res['type_of_food_you_prefer'];
			this.model.food_val = res['type_of_food_you_prefer'];
			$('#r_food_'+res['type_of_food_you_prefer']).addClass('active');
			
		});
	}

	var lang_code = JSON.parse(localStorage.getItem('lang'));
	this.fetch.get_terms_conditions(lang_code).subscribe(res=>{
        if(res.success){
           this.model.content = res.data.content;
        }else{
          this.model.content = '';
        }
        
    }); 
  }
  food_type(val){
	this.model.food_val = val;
	if(val == 1){
		$('#r_food_'+val).addClass('active');  
		$('#r_food_2').removeClass('active');  
		$('#r_food_3').removeClass('active');  
	}else if(val == 2){
		$('#r_food_'+val).addClass('active');  
		$('#r_food_1').removeClass('active');  
		$('#r_food_3').removeClass('active');    
	}else{
		$('#r_food_'+val).addClass('active');  
		$('#r_food_1').removeClass('active');  
		$('#r_food_2').removeClass('active');     
	}
  }
  save(){
	
	var username = $('.input_username').val();
	var dob = $('.input_dob').val();
	var food_type = this.model.food_val;

	if(username == ""){
		this.errorMsg.showModal(this.model.username_req);
	}else if(dob == ""){
		this.errorMsg.showModal(this.model.dob_req);
	}else if(food_type == ""){
		this.errorMsg.showModal(this.model.food_type_req);
	}
	else{
		var user_id = JSON.parse(localStorage.getItem('user_id'));
		let data = JSON.stringify({'id' : user_id, 'username' : username, 'dob' : dob, 'food_type' : food_type});
		this.fetch.registerUser(data).subscribe(res => {
			if(res.success == true){
				this.openTermsAndConditions();
				localStorage.setItem('user_registerd', JSON.stringify(res['user_id']));
			}else{
				this.errorMsg.showModal("Enter unique username.");
			}
		});
	}
  }
  async openTermsAndConditions() {
	
    const modal = await this.modalController.create({
      component: TermsConditionsPage,
      cssClass: 'home_content_modal_new',
      componentProps: {
        "paramID": 123,
        "paramTitle": 1,
		"content" : this.model.content
      }
    }); 

    modal.onDidDismiss().then((dataReturned) => {

    });

    return await modal.present();
  }


}
