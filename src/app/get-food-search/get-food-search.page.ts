import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CurrentLocationContentPage } from '../modal/current-location-content/current-location-content.page';
import { LocationErrorContentPage } from '../modal/location-error-content/location-error-content.page';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Location } from "@angular/common";
import { AlertController } from '@ionic/angular';

declare var $:any;

@Component({
  selector: 'app-get-food-search',
  templateUrl: './get-food-search.page.html',
  styleUrls: ['./get-food-search.page.scss'],
})
export class GetFoodSearchPage implements OnInit {
	model:any={};
	location_data:any=[];
  dataReturned: any;
  constructor(
    public modalController: ModalController,
	private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
	public alertController: AlertController,
	private platform: Platform,
	private location: Location
  ) {
	this.platform.backButton.subscribeWithPriority(10, () => {
		this.location.back();
	});
	  }

  ngOnInit() {
	this.model.alert_text = 'Please fill all the details';
	this.model.okay = 'okay';
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	this.fetch.getKeyText(lang_code).subscribe(res => {
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
	});
	var receiver_location = JSON.parse(localStorage.getItem('receiver_location'));
	this.location_data = receiver_location;
	console.log(this.location_data);
	var receiver_food_type = JSON.parse(localStorage.getItem('receiver_food_type'));
	if(receiver_food_type != null){
		$('#g_food_'+receiver_food_type).addClass('active'); 
	}
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
	var receiver_food_type = JSON.parse(localStorage.getItem('receiver_food_type'));
	var number_of_person = $('#get_food_number').val();
	if(receiver_food_type == null){
		this.presentAlert();
	}else if(number_of_person == '' || number_of_person == 0){
		this.presentAlert();
	} else if(this.location_data == null){
		this.openModalError();
	}else{
		this.model.user_id = JSON.parse(localStorage.getItem('user_id'));
		let data = JSON.stringify({'app_user_id' : this.model.user_id,'food_type' : receiver_food_type, 'no_of_person' : number_of_person, 'latitude' : this.location_data.latitude, 'longitude' : this.location_data.longitude, 'colony_name' : this.location_data.colony_name, 'city' : this.location_data.city, 'state' : this.location_data.state, 'country' : this.location_data.country, 'postal_code' : this.location_data.postalCode});
		console.log(data);
		this.fetch.receiver_food_details(data).subscribe(res => {
			this.router.navigate(['/nearest-donors',res.receiver_food_id]);
		});
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
