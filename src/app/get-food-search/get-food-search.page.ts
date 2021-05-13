import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CurrentLocationContentPage } from '../modal/current-location-content/current-location-content.page';
import { OnTheWayPage } from '../modal/on-the-way/on-the-way.page';
import { ReceiverConfirmPage } from '../modal/receiver-confirm/receiver-confirm.page';
import { LocationErrorContentPage } from '../modal/location-error-content/location-error-content.page';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Location } from "@angular/common";
import { AlertController } from '@ionic/angular';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { NotificationPage } from '../modal/notification/notification.page';
declare var $:any;

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
  constructor(
    public modalController: ModalController,
	private http: HttpClient,
	private route: ActivatedRoute,
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
	console.log(this.location_data);
	// this.location_data={
	// 	"latitude":23.165166,"longitude":75.7888409,"colony_name":"Sarthak Nagar","city":"Ujjain","state":"Madhya Pradesh","country":"India","postalCode":"456010"
	// }
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
	var distance = $('#distance').val();
	if(receiver_food_type == null && (number_of_person == '' || number_of_person== 0) && (distance == '' || distance == 0)){
		$('.receiver_error_border').addClass('error-line');
		$('.minus').addClass('error-minus');
		$('.food_value').addClass('error-value');
		$('.plus').addClass('error-plus');
		$('.minus-distance').addClass('error-minus');
		$('.distance_value').addClass('error-value');
		$('.plus-distance').addClass('error-plus');
		$('.receiver_food_type-error-text').show();
		$('.number-error-text').show();
		$('.distance-error-text').show();
		this.model.search = false;
	}
	else if(receiver_food_type == null){
		$('.receiver_error_border').addClass('error-line');
		$('.minus').removeClass('error-minus');
		$('.food_value').removeClass('error-value');
		$('.plus').removeClass('error-plus');
		$('.minus-distance').removeClass('error-minus');
		$('.distance_value').removeClass('error-value');
		$('.plus-distance').removeClass('error-plus');
		$('.receiver_food_type-error-text').show();
		$('.number-error-text').hide();
		$('.distance-error-text').hide();
		this.model.search = false;
		// this.presentAlert();
	}else if(number_of_person == '' || number_of_person == 0){
		$('.receiver_error_border').removeClass('error-line');
		$('.minus').addClass('error-minus');
		$('.food_value').addClass('error-value');
		$('.plus').addClass('error-plus');
		$('.minus-distance').removeClass('error-minus');
		$('.distance_value').removeClass('error-value');
		$('.plus-distance').removeClass('error-plus');
		$('.receiver_food_type-error-text').hide();
		$('.number-error-text').show();
		$('.distance-error-text').hide(); 
		this.model.search = false;
		//this.presentAlert();
	}else if(distance == '' || distance == 0){
		$('.receiver_error_border').removeClass('error-line');
		$('.minus').removeClass('error-minus');
		$('.food_value').removeClass('error-value');
		$('.plus').removeClass('error-plus');
		$('.minus-distance').addClass('error-minus');
		$('.distance_value').addClass('error-value');
		$('.plus-distance').addClass('error-plus');
		$('.receiver_food_type-error-text').hide();
		$('.number-error-text').hide();
		$('.distance-error-text').show(); 
		this.model.search = false;
		//this.presentAlert();
	} else if(this.location_data == null && this.ontheway_data.length ==0){
		$('.receiver_error_border').removeClass('error-line');
		$('.minus').removeClass('error-minus');
		$('.food_value').removeClass('error-value');
		$('.plus').removeClass('error-plus');
		$('.minus-distance').removeClass('error-minus');
		$('.distance_value').removeClass('error-value');
		$('.plus-distance').removeClass('error-plus');
		$('.receiver_food_type-error-text').hide();
		$('.number-error-text').hide(); 
		$('.distance-error-text').hide(); 
		this.model.search = false;
		this.openModalError();
	}else{
		$('.receiver_error_border').removeClass('error-line');
		$('.minus').removeClass('error-minus');
		$('.food_value').removeClass('error-value');
		$('.plus').removeClass('error-plus');
		$('.minus-distance').removeClass('error-minus');
		$('.distance_value').removeClass('error-value');
		$('.plus-distance').removeClass('error-plus');
		$('.receiver_food_type-error-text').hide();
		$('.number-error-text').hide(); 
		$('.distance-error-text').hide(); 
		this.model.user_id = JSON.parse(localStorage.getItem('user_id'));
		if(this.location_data != null){
			let data = JSON.stringify({'app_user_id' : this.model.user_id,'food_type' : receiver_food_type, 'no_of_person' : number_of_person, 'latitude' : this.location_data.latitude, 'longitude' : this.location_data.longitude, 'colony_name' : this.location_data.colony_name, 'city' : this.location_data.city, 'state' : this.location_data.state, 'country' : this.location_data.country, 'postal_code' : this.location_data.postalCode, 'distance': distance});
			//console.log(data);
			this.fetch.receiver_food_details(data).subscribe(res => {
				console.log(res);
				if(res.data != null && res.data.total_food_for != 0){
					this.data = res;
				}else{
					this.data = {'success' : true, 'data' : null};
				}
				this.model.search = false;
				
				this.model.food_type = receiver_food_type;
				this.model.no_of_person = number_of_person;
				this.model.distance = distance;
				this.openReceiverConfirmPage();
				//this.router.navigate(['/nearest-donors',res.receiver_food_id]);
			});
		}
		if(this.ontheway_data.length>0){
			let data = JSON.stringify({startLat:this.ontheway_data[0].startLat,startLng:this.ontheway_data[0].startLng,endLat:this.ontheway_data[0].endLat,endLng:this.ontheway_data[0].endLng,city:this.ontheway_data[0].city,choice:"receiver",'app_user_id' : this.model.user_id,'food_type' : receiver_food_type, 'no_of_person' : number_of_person});
     			this.fetch.get_waypoints(data).subscribe(res => {
					this.model.search = false;
					if(res.data != null && res.data.total_food_for != 0){
						this.data = res;
					}else{
						this.data = {'success' : true, 'data' : null};
					}
					
					this.model.food_type = receiver_food_type;
					this.model.no_of_person = number_of_person;
					this.model.distance = distance;
					this.openReceiverConfirmPage();
				 })
		}
	}
  }

  async openModalCurrentLocation() {
	localStorage.setItem('set_confirm_location_route', JSON.stringify('get-food-search'));
    const modal = await this.modalController.create({
      component: CurrentLocationContentPage,
      cssClass: 'custom_current_location_modal',
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    }); 

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
		this.location_data = JSON.parse(this.dataReturned);
		this.ontheway_data = [];
		var receiver_food_type = JSON.parse(localStorage.getItem('receiver_food_type'));
		let data = JSON.stringify({'app_user_id' : this.model.user_id,'latitude' : this.location_data.latitude, 'longitude' : this.location_data.longitude, 'colony_name' : this.location_data.colony_name, 'city' : this.location_data.city, 'state' : this.location_data.state, 'country' : this.location_data.country, 'postal_code' : this.location_data.postalCode,'food_type' : receiver_food_type});
		this.fetch.recomended_distance(data).subscribe(res => {
			this.model.recommended_distance = res.data;
		});

      }
    });

    return await modal.present();
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
        //alert('Modal Sent Data :'+ dataReturned);
		console.log(this.dataReturned);
		if(this.dataReturned.length>0){
			this.ontheway_data = this.dataReturned;
			this.location_data = null;
		}
		// let data = JSON.stringify({'app_user_id' : this.model.user_id,'latitude' : this.location_data.latitude, 'longitude' : this.location_data.longitude, 'colony_name' : this.location_data.colony_name, 'city' : this.location_data.city, 'state' : this.location_data.state, 'country' : this.location_data.country, 'postal_code' : this.location_data.postalCode});
		// this.fetch.recomended_distance(data).subscribe(res => {
		// 	this.model.recommended_distance = res.data;
		// });

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
        //alert('Modal Sent Data :'+ dataReturned);
		//this.location_data = JSON.parse(this.dataReturned);
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
  async presentAlert() {
		const alert = await this.alertController.create({
		  cssClass: 'my-custom-class',
		  header: this.model.alert_text,
		  buttons: [this.model.okay]
		});
		await alert.present();
  }

} 
