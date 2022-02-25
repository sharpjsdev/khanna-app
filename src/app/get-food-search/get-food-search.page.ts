import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OnTheWayPage } from '../modal/on-the-way/on-the-way.page';
import { ReceiverConfirmPage } from '../modal/receiver-confirm/receiver-confirm.page';
import { LocationErrorContentPage } from '../modal/location-error-content/location-error-content.page';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Location } from "@angular/common";
import { AlertController } from '@ionic/angular';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
declare var $:any;
declare var google: any;

@Component({
  selector: 'app-get-food-search',
  templateUrl: './get-food-search.page.html',
  styleUrls: ['./get-food-search.page.scss'],
})
export class GetFoodSearchPage implements OnInit {
	model:any={};
	location_data:any;
	data : any= [];
  dataReturned: any;
  ontheway_data :any=[];
  notification:any=[];
  options : GeolocationOptions;
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  constructor(
	private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public modalController: ModalController,
	private router: Router,
	private fetch: FetchService,
	private storage: StorageService,
	public alertController: AlertController,
	private platform: Platform,
	private location: Location
  ) {
	this.platform.backButton.subscribeWithPriority(10, () => {
		this.location.back();
	});
	  }

  ngOnInit() {
	
	
  }
  ionViewWillEnter(){
	  this.model.search = false;
	this.model.is_volunteer = 0;
	if(localStorage.getItem('volunteer_approve') != null){
		this.model.is_volunteer = localStorage.getItem('volunteer_approve');
	} 
	this.model.user_id = JSON.parse(localStorage.getItem('user_id'));
	this.model.alert_text = 'Please fill all the details';
	this.model.okay = 'okay';
	
	var receiver_location = JSON.parse(localStorage.getItem('receiver_location'));
	this.location_data = receiver_location;
	if(this.location_data){
		let data = JSON.stringify({'app_user_id' : this.model.user_id,'latitude' : this.location_data.latitude, 'longitude' : this.location_data.longitude, 'colony_name' : this.location_data.colony_name, 'city' : this.location_data.city, 'state' : this.location_data.state, 'country' : this.location_data.country, 'postal_code' : this.location_data.postalCode});
		this.fetch.recomended_distance(data).subscribe(res => {
			this.model.recommended_distance = res.data;
		});
	}
	var receiver_food_type = JSON.parse(localStorage.getItem('receiver_food_type'));
	if(receiver_food_type != null){
		$('#g_food_'+receiver_food_type).addClass('active'); 
	}

	this.options = {
		enableHighAccuracy: false,
		};
	  this.geolocation.getCurrentPosition(this.options).then((resp) => {
		this.model.currLat = resp.coords.latitude;
		this.model.currLng = resp.coords.longitude;
		var self = this;
		localStorage.setItem('nearby_lat',self.model.currLat);
		localStorage.setItem('nearby_lng',self.model.currLng);
		self.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, this.geoencoderOptions)
	  .then((result: NativeGeocoderResult[]) => {
		self.model.curr_address = self.generateAddress(result[0]);
		
		localStorage.setItem('nearby_address',this.model.curr_address);
	  })
	  .catch((error: any) => {
	  });
	  }); 

  }
  //Return Comma saperated address
  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }
  ionViewDidEnter(){
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	//this.fetch.getKeyText(lang_code).subscribe(res => {
		let res = this.storage.getScope();
		let item1 = res.find(i => i.key_text === 'SELECT_TYPE_OF_FOOD');
			this.model.key_text1 = item1[lang_code];
		let item2 = res.find(i => i.key_text === 'VEG');
			this.model.key_text2 = item2[lang_code]; 
		let item3 = res.find(i => i.key_text === 'NON_VEG');
			this.model.key_text3 = item3[lang_code]; 
		let item4 = res.find(i => i.key_text === 'BOTH');
			this.model.key_text4 = item4[lang_code]; 
		let item5 = res.find(i => i.key_text === 'FOOD_NEEDED_FOR_HOW_MANY_PEOPLE');
			this.model.key_text5 = item5[lang_code]; 
		let item6 = res.find(i => i.key_text === 'CURRENT_LOCATION');
			this.model.key_text6 = item6[lang_code]; 
		let item7 = res.find(i => i.key_text === 'SEARCH_FOOD');
			this.model.key_text7 = item7[lang_code]; 
		let item8 = res.find(i => i.key_text === 'HOME');
			this.model.key_text8 = item8[lang_code];
		let item9 = res.find(i => i.key_text === 'ACTIVITY');
			this.model.key_text9 = item9[lang_code];
		let item10 = res.find(i => i.key_text === 'VOLUNTEER');
			this.model.key_text10 = item10[lang_code];
		let item11 = res.find(i => i.key_text === 'PLEASE_FILL_ALL_THE_DETAILS');
			this.model.alert_text = item11[lang_code];
		let item12 = res.find(i => i.key_text === 'OKAY');
			this.model.okay = item12[lang_code];
		let item13 = res.find(i => i.key_text === 'ANY');
			this.model.key_text13 = item13[lang_code];
		let item14 = res.find(i => i.key_text === 'CONVIENIENT_DISTANCE');
			this.model.key_text14 = item14[lang_code];
		let item15 = res.find(i=> i.key_text === 'SHOW_IN_BETWEEN');
			this.model.key_text15 = item15[lang_code]; 	
		let item16 = res.find(i=> i.key_text === 'THIS_FIELD_IS_REQUIRED');
			this.model.key_text16 = item16[lang_code]; 	
			
	//}); 
	 
  }
  food_type(val){
	this.model.food_type = val; 
	if(val == 1){
		$('#g_food_'+val).addClass('active');  
		$('#g_food_2').removeClass('active');  
		$('#g_food_3').removeClass('active');  
	}else if(val == 2){
		$('#g_food_'+val).addClass('active');  
		$('#g_food_1').removeClass('active');  
		$('#g_food_3').removeClass('active');    
	}else{
		$('#g_food_'+val).addClass('active');  
		$('#g_food_2').removeClass('active');  
		$('#g_food_1').removeClass('active');     
	}
	localStorage.setItem('receiver_food_type', val);
  
  }
  
  search_food(){
	this.model.search = true;
	var receiver_food_type = JSON.parse(localStorage.getItem('receiver_food_type'));
	var number_of_person = $('#get_food_number').val();
	localStorage.setItem('number_of_person',number_of_person);
	if(receiver_food_type == null && (number_of_person == '' || number_of_person== 0)){
		$('.receiver_error_border').addClass('error-line');
		$('.minus').addClass('error-minus');
		$('.food_value').addClass('error-value');
		$('.plus').addClass('error-plus');
		$('.receiver_food_type-error-text').show();
		$('.number-error-text').show();
		this.model.search = false;
	}
	else if(receiver_food_type == null){
		$('.receiver_error_border').addClass('error-line');
		$('.minus').removeClass('error-minus');
		$('.food_value').removeClass('error-value');
		$('.plus').removeClass('error-plus');
		$('.receiver_food_type-error-text').show();
		$('.number-error-text').hide();
		this.model.search = false;
		// this.presentAlert();
	}else if(number_of_person == '' || number_of_person == 0){
		$('.receiver_error_border').removeClass('error-line');
		$('.minus').addClass('error-minus');
		$('.food_value').addClass('error-value');
		$('.plus').addClass('error-plus');
		$('.receiver_food_type-error-text').hide();
		$('.number-error-text').show();
		this.model.search = false;
		//this.presentAlert();
	} else{
		$('.receiver_error_border').removeClass('error-line');
		$('.minus').removeClass('error-minus');
		$('.food_value').removeClass('error-value');
		$('.plus').removeClass('error-plus');
		$('.receiver_food_type-error-text').hide();
		$('.number-error-text').hide(); 
		this.model.user_id = JSON.parse(localStorage.getItem('user_id'));
		this.router.navigate(['/search-food-screen-two']);
	}
  }
  async openOnTheWay() {
	localStorage.setItem('set_confirm_location_route', JSON.stringify('get-food-search'));
    const modal = await this.modalController.create({
      component: OnTheWayPage,
      cssClass: 'custom_current_location_modal',
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    }); 

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
		if(this.dataReturned.length>0){
			this.ontheway_data = this.dataReturned;
			this.location_data = null;
		}
      }
    });

    return await modal.present();
  }
  async openReceiverConfirmPage() {
	//localStorage.setItem('set_confirm_location_route', JSON.stringify('get-food-search'));
    const modal = await this.modalController.create({
      component: ReceiverConfirmPage,
      cssClass: 'custom_receiver_confirm_modal',
      componentProps: {
        "paramID": 123,
		"paramTitle": "Test Title",
		"data" : this.data,
		"food_type" : this.model.food_type,
		"no_of_person" : this.model.no_of_person,
		"app_user_id" : this.model.user_id,
		"location_data" : this.location_data,
		"distance" : this.model.distance,
		"ontheway_data" : this.ontheway_data 
      }
    }); 
	
		
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
		this.dataReturned = dataReturned.data;
		$('#g_food_1').removeClass('active');  
		$('#g_food_2').removeClass('active');  
		$('#g_food_3').removeClass('active');
		localStorage.removeItem('receiver_food_type'); 
		if(dataReturned.data != 'accept'){
			
		this.router.navigate(['/home']);
		}
		else{
			let receiver_food_id = localStorage.getItem('res.receiver_food_id');
			if(this.location_data != null){
			this.router.navigate(['/get-food-nearest-donors',JSON.stringify(this.data),this.location_data.latitude,this.location_data.longitude,this.model.user_id,receiver_food_id]);
			}else if(this.ontheway_data.length>0){
				this.router.navigate(['/get-food-nearest-donors',JSON.stringify(this.data),this.ontheway_data[0].startLat,this.ontheway_data[0].startLng,this.model.user_id,receiver_food_id]);
			}
		}
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
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

} 
