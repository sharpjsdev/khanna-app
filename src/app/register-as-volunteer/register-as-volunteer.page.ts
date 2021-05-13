import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service'; 
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { TermsConditionsPage } from '../modal/terms-conditions/terms-conditions.page';
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


  constructor(private storage:StorageService,private http: HttpClient,private route: ActivatedRoute,private router: Router,private fetch: FetchService,public alertController: AlertController,public datepipe: DatePipe,public modalController: ModalController) { }

  ngOnInit() {
	
	
	/*if(JSON.parse(localStorage.getItem('user_registerd')) != null){
		this.router.navigate(['/home']);
	}*/
	
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
	var terms = $('#terms:checked').val();

	if(username == ""){
		this.presentAlert("Username is required");
	}else if(dob == ""){
		this.presentAlert("DOB is required");
	}else if(food_type == ""){
		this.presentAlert("Food type is required");
	}else if(terms == undefined){
		this.presentAlert("Please check terms & conditions");
	}
	else{
		var user_id = JSON.parse(localStorage.getItem('user_id'));
		let data = JSON.stringify({'id' : user_id, 'username' : username, 'dob' : dob, 'food_type' : food_type});
		console.log(data);
		this.fetch.registerUser(data).subscribe(res => {
			console.log(res);
			if(res.success == true){
				localStorage.setItem('user_registerd', JSON.stringify(res['user_id']));
				//$('.input_username').val('');
				//$('.input_dob').val('');
				this.router.navigate(['/home']);
			}
		});
	}
  }
  async openTermsAndConditions() {
	
    const modal = await this.modalController.create({
      component: TermsConditionsPage,
      cssClass: 'home_content_modal',
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title",
		"content" : this.model.content
      }
    }); 

    modal.onDidDismiss().then((dataReturned) => {
		
      if (dataReturned !== null) {
      }
    });

    return await modal.present();
  }
  async presentAlert(msg) {
	const alert = await this.alertController.create({
		cssClass: 'my-custom-class',
		header: msg,
		buttons: [this.model.okay]
	});
	await alert.present();
  }

}
