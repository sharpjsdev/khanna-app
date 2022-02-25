import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CurrentLocationContentPage } from '../modal/current-location-content/current-location-content.page';
import { LocationErrorContentPage } from '../modal/location-error-content/location-error-content.page';
import { HomeContentPage } from '../modal/home-content/home-content.page';
import { Platform } from '@ionic/angular';
import { Location } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TermsConditionsPage } from '../modal/terms-conditions/terms-conditions.page';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ErrorMsgModalPage } from '../modal/error-msg-modal/error-msg-modal.page';
declare var $:any;

@Component({ 
  selector: 'app-register-volunteer',
  templateUrl: './register-volunteer.page.html',
  styleUrls: ['./register-volunteer.page.scss'],
})
export class RegisterVolunteerPage implements OnInit {
  dataReturned: any;
  model:any={};
  user_:any={};
  fromTime:string = "";
  toTime:string = "";
	location_data:any=[];
	volunteer_data:any=[];
	alert_text: any;
  constructor(
	public modalController: ModalController,
	private platform: Platform,
	private location: Location,
	private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
	private storage: StorageService,
	public alertController: AlertController,
	private datePicker: DatePicker
  ) {
	this.platform.backButton.subscribeWithPriority(10, () => {
		this.location.back();
	});
	  }

  ngOnInit() {
	this.model.accept = false;
	   this.model.search = false;
  }

  ionViewWillEnter(){
	this.model.is_address = false;
	this.user_.colony_name = '';
	this.user_.city = '';
	this.user_.state = '';
	this.user_.country = '';
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	//this.fetch.getKeyText(lang_code).subscribe(res => {
		let res = this.storage.getScope();
		let item1 = res.find(i => i.key_text === 'KHANAA_APP');
			this.model.key_text1 = item1[lang_code];
		let item2 = res.find(i => i.key_text === 'VOLUNTEER_TAG');
			this.model.key_text2 = item2[lang_code];
		let item3 = res.find(i => i.key_text === 'DATE_OF_BIRTH');
			this.model.key_text3 = item3[lang_code];
		let item4 = res.find(i => i.key_text === 'USERNAME');
			this.model.key_text4 = item4[lang_code];
		let item5 = res.find(i => i.key_text === 'SET_LOCATION');
			this.model.key_text5 = item5[lang_code];
		let item6 = res.find(i => i.key_text === 'REGISTER');
			this.model.key_text6 = item6[lang_code];
		let item7 = res.find(i => i.key_text === 'SAVE_CHANGES');
			this.model.key_text7 = item7[lang_code];
		let item8 = res.find(i => i.key_text === 'DEAR');
			this.model.key_text8 = item8[lang_code];
		let item9 = res.find(i => i.key_text === 'SHOP_NAME');
			this.model.key_text9 = item9[lang_code];
		let item10 = res.find(i => i.key_text === 'SHOP_LOCATION');
			this.model.key_text10 = item10[lang_code];
		let item11 = res.find(i => i.key_text === 'WORKING_HOURS_NEW');
			this.model.key_text11 = item11[lang_code];
		let item13 = res.find(i => i.key_text === 'TERMS_CONDITIONS');
			this.model.terms = item13[lang_code];		
		let alert_text = res.find(i => i.key_text === 'KEEP_PIN_EXACT_LOCATION');
			this.alert_text = alert_text[lang_code]; 
		let item12 = res.find(i => i.key_text === 'OKAY');
			this.model.okay = item12[lang_code]; 	
		let item14 = res.find(i => i.key_text === 'FROM');
			this.model.key_text14 = item14[lang_code]; 	
		let item15 = res.find(i => i.key_text === 'TO');
			this.model.key_text15 = item15[lang_code]; 	
		let item16 = res.find(i => i.key_text === 'THIS_FIELD_IS_REQUIRED');
			this.model.key_text16 = item16[lang_code];
		let item17 = res.find(i => i.key_text === 'PLEASE_SELECT_A_LOCATION');
			this.model.key_text17 = item17[lang_code]; 	
	//});
	//console.log(this.location_data);
	$("#v_update").css("display","none");
	this.model.volunteer_id = '';
	var user_id = JSON.parse(localStorage.getItem('user_registerd'));
	this.fetch.v_check(user_id).subscribe(res => {
		//alert(res.data);
		if(res.success == true){
			$("#v_register").css("display","none");
			$("#v_update").css("display","block");
			this.model.volunteer_id = res.data;
			this.fetch.v_edit(this.model.volunteer_id).subscribe(res => {
				console.log(res.data);
				this.volunteer_data = res.data;
				this.model.is_address = true;
				this.model.volunteer_id = res.data.id;
				var time_split = res.data.working_hour.split("-");
				this.fromTime = time_split[0];
				this.toTime = time_split[1];
				this.model.app_status = res.data.app_status == 1 ? true : false;
			});
		}else{
			this.model.volunteer_id = JSON.parse(localStorage.getItem('volunteer_id'));
			if(this.model.volunteer_id != null){
				$("#v_register").css("display","none");
				$("#v_update").css("display","block");
				this.fetch.v_edit(this.model.volunteer_id).subscribe(res => {
					console.log(res);
					if(res.success == true){
						this.model.app_status = res.data.app_status == 1 ? true : false;
						this.volunteer_data = res.data;
						this.model.is_address = true;
						
					}
				});
			}else{
				$("#v_register").css("display","block");
				$("#v_update").css("display","none");
				let data = JSON.stringify({'id': user_id});
				this.fetch.profile(data).subscribe(res => {
					this.volunteer_data.username = res['username'];
					this.volunteer_data.dob = res['dob'];
				});
				this.fetch.getUserLocationForDonation(user_id).subscribe(res => {
					if(res.success == true){
						console.log(res);
						this.user_.colony_name = res.data.colony_name;
						this.user_.city = res.data.city;
						this.user_.state = res.data.state;
						this.user_.country = res.data.country;
						this.user_.latitude = res.data.latitude;
						this.user_.longitude = res.data.longitude;
						this.user_.postalCode = res.data.postalCode;
					}
				});
			}
		}
	});
	
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	this.fetch.volunteer_get_terms_conditions(lang_code).subscribe(res=>{
        if(res.success){
           this.model.content = res.data.content;
        }else{
          this.model.content = '';
        }
        
    });
  }
  async openModalCurrentLocation() {
	localStorage.setItem('set_confirm_location_route', JSON.stringify('register-volunteer'));	  
    const modal = await this.modalController.create({
      component: CurrentLocationContentPage,
      cssClass: 'custom_current_location_modal_new',
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    }); 

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
		this.location_data = JSON.parse(this.dataReturned);
		this.model.is_address = true;
		this.volunteer_data.latitude = this.location_data.latitude;
		 this.volunteer_data.longitude = this.location_data.longitude;
		 this.volunteer_data.colony_name = this.location_data.colony_name;
		 this.volunteer_data.city = this.location_data.city;
		 this.volunteer_data.state = this.location_data.state;
		 this.volunteer_data.country = this.location_data.country;
		 this.volunteer_data.postalCode = this.location_data.postalCode;
      }
    });

    return await modal.present();
  }

  async successFullRegistration() { 
	
    const modal = await this.modalController.create({
      component: HomeContentPage,
      cssClass: 'home_content_modal',
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    }); 

    modal.onDidDismiss().then((dataReturned) => {
		$("#v_register").css("display","block");
		$("#v_update").css("display","none");
		this.router.navigate(['/home']);
      if (dataReturned !== null) {
      }
    });

    return await modal.present();
  }
  async openTermsAndConditions() {
	
    const modal = await this.modalController.create({
      component: TermsConditionsPage,
      cssClass: 'home_content_modal_new',
      componentProps: {
        "paramID": 123,
        "paramTitle": 2,
		"content" : this.model.content
      }
    }); 

    modal.onDidDismiss().then((dataReturned) => {
		$("#v_register").css("display","block");
		$("#v_update").css("display","none");
		this.model.accept = dataReturned.data;
		if(this.model.accept == true){
			$('#dup-chekbox').css('background-color','#419b95');
			$('#dup-chekbox').css('border-color','#419b95');
		}else{
			$('#dup-chekbox').css('background-color','#fff');
			$('#dup-chekbox').css('border-color','#ccc');
		}
		///$('#terms').attr('checked',true);
      if (dataReturned !== null) {
      }
    });

    return await modal.present();
  }
  async openModalError() { 
    const modal = await this.modalController.create({
      component: LocationErrorContentPage,
      cssClass: 'custom_otp_modal',
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    }); 

    modal.onDidDismiss().then((dataReturned) => {
		
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
		this.location_data = JSON.parse(this.dataReturned);
      }
    });

    return await modal.present();
  }
  
  register(){
	var shop_name = $("#shop_name").val();
	var working_hours = this.fromTime+'-'+this.toTime;
	var shop_location = $("#shop_location").val();
	//var terms = $('#terms:checked').val();
	this.model.search = true;
	if(shop_name == '' && this.fromTime == '' && this.toTime == ''){
		this.model.search = false;
		
		$('#shop_name').addClass('error_border');
		$('#from_time').addClass('error_border');
		$('#to_time').addClass('error_border');
		$('.error_msg_from_time').css('display','block');
		$('.error_msg_to_time').css('display','block');
		$('.error_msg_shop_name').css('display','block');
		$('.error_terms').hide();
	}
	else if(shop_name == ''){
		this.model.search = false;
		$('#shop_name').addClass('error_border');
		$('#from_time').removeClass('error_border');
		$('#to_time').removeClass('error_border');
		$('.error_msg_from_time').css('display','none');
		$('.error_msg_to_time').css('display','none');
		$('.error_msg_shop_name').css('display','block');
		//$('.error_terms').hide();
	}else if(this.fromTime == ''){
		this.model.search = false;
		$('#shop_name').removeClass('error_border');
		$('#from_time').addClass('error_border');
		$('#to_time').removeClass('error_border');
		$('.error_msg_from_time').css('display','block');
		$('.error_msg_to_time').css('display','none');
		$('.error_msg_shop_name').css('display','none');
		//$('.error_terms').hide();
	}else if(this.toTime == ''){
		this.model.search = false;
		$('#shop_name').removeClass('error_border');
		$('#from_time').removeClass('error_border');
		$('#to_time').addClass('error_border');
		$('.error_msg_from_time').css('display','none');
		$('.error_msg_to_time').css('display','block');
		$('.error_msg_shop_name').css('display','none');
	}else if(!(this.volunteer_data.latitude || this.volunteer_data.longitude || this.volunteer_data.colony_name || this.volunteer_data.city || this.volunteer_data.state || this.volunteer_data.country || this.volunteer_data.postalCode)){
		// this.presentAlert();
		this.model.search = false;
		$('#shop_name').removeClass('error_border');
		$('#from_time').removeClass('error_border');
		$('#to_time').removeClass('error_border');
		$('.error_msg_from_time').css('display','none');
		$('.error_msg_to_time').css('display','none');
		$('.error_msg_shop_name').css('display','none');
		$('#shop_location').addClass('error_border');
		$('.error_msg_shop_location').css('display','block');
	}
	else{
		
		$('#shop_name').removeClass('error_border');
		$('#from_time').removeClass('error_border');
		$('#to_time').removeClass('error_border');
		$('.error_msg_from_time').css('display','none');
		$('.error_msg_to_time').css('display','none');
		$('.error_msg_shop_name').css('display','none');
		$('#shop_location').removeClass('error_border');
		$('.error_msg_shop_location').css('display','none');
		//$('.error_terms').hide();
		if(this.model.volunteer_id == '' || this.model.volunteer_id == null){
			if(this.volunteer_data.latitude === undefined && this.volunteer_data.longitude === undefined && this.volunteer_data.colony_name === undefined && this.volunteer_data.city === undefined && this.volunteer_data.state === undefined && this.volunteer_data.country === undefined && this.volunteer_data.postalCode === undefined){
				this.volunteer_data.colony_name = this.user_.colony_name;
				this.volunteer_data.city = this.user_.city;
				this.volunteer_data.state = this.user_.state;
				this.volunteer_data.country = this.user_.country;
				this.volunteer_data.latitude = this.user_.latitude;
				this.volunteer_data.longitude =	this.user_.longitude;
				this.volunteer_data.postalCode = this.user_.postalCode;
			}
			var app_status = 0;
			
			let data = JSON.stringify({'app_user_id' : JSON.parse(localStorage.getItem('user_id')),'username' : this.volunteer_data.username, 'dob' : this.volunteer_data.dob, 'latitude' : this.volunteer_data.latitude, 'longitude' : this.volunteer_data.longitude,'colony_name' : this.volunteer_data.colony_name, 'city' : this.volunteer_data.city, 'state' : this.volunteer_data.state, 'country' : this.volunteer_data.country, 'postalCode' : this.volunteer_data.postalCode,'status' : 0, 'shop_stall_name' : shop_name, 'working_hour' : working_hours,'app_status':app_status, 'countof_closeapp' : this.volunteer_data.countof_closeapp});
			this.fetch.register_volunteer(data).subscribe(res => {
					this.model.search = false;
					this.openTermsAndConditions();
					localStorage.setItem('volunteer_id', res.volunteer_id);  
			});
		}else{
			var app_status = 0;
			let data = JSON.stringify({'id' : this.model.volunteer_id,'app_user_id' : JSON.parse(localStorage.getItem('user_id')),'username' : this.volunteer_data.username, 'dob' : this.volunteer_data.dob, 'latitude' : this.volunteer_data.latitude, 'longitude' : this.volunteer_data.longitude,'colony_name' : this.volunteer_data.colony_name, 'city' : this.volunteer_data.city, 'state' : this.volunteer_data.state, 'country' : this.volunteer_data.country, 'postalCode' : this.volunteer_data.postalCode,'status' : 0, 'shop_stall_name' : shop_name, 'working_hour' : working_hours,'app_status':app_status,'countof_closeapp' : this.volunteer_data.countof_closeapp});
			
			this.fetch.update_volunteer(data).subscribe(res => {
					this.model.search = false;
					localStorage.setItem('volunteer_id', res.volunteer_id);  
					this.router.navigate(['/home']);
				//}
			});
		}
	}
  }
  async presentAlert() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			message: 'Please fill all the details',
			buttons: ['Okay']
		});
		await alert.present();
  }
  async msgAlert(msg) {
	const alert = await this.alertController.create({
		cssClass: 'my-custom-class',
		message: msg,
		buttons: ['Okay']
	});
	await alert.present();
}
  from(){
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
      okText:"Save Time",
      nowText:"Set Now"
    }).then(
      time => {
        this.fromTime = this.formatAMPM(time);
      },
      err => console.log('Error occurred while getting time: '+ JSON.stringify(err))
    );
  } 
  to(){

    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
      okText:"Save Time",
      nowText:"Set Now"
    }).then(
      time => {
        this.toTime =  this.formatAMPM(time);
      },
      err => console.log('Error occurred while getting time: '+ JSON.stringify(err))
    );
  }
  
  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


  async presentConfirm(){
	const modal = await this.modalController.create({
	  component: ErrorMsgModalPage,
	  cssClass: 'error_modal_css',
	  backdropDismiss : false,
	  componentProps: {
		"msg": this.alert_text,
	  }
	});
  
	modal.onDidDismiss().then((dataReturned) => {
	  this.openModalCurrentLocation();
	});
  
	return await modal.present();
  
  }

}
