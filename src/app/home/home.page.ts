import { Component, OnInit, Input  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeContentPage } from '../modal/home-content/home-content.page';
import { NotificationPage } from '../modal/notification/notification.page';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';  
declare var FCMPlugin: any;
declare var google: any;
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
model:any={};
options : GeolocationOptions;
  dataReturned: any;
  constructor(
    public modalController: ModalController,
	private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
	private storage : StorageService,
	private platform: Platform,
	private geolocation: Geolocation,
  ) { 
	this.platform.backButton.subscribeWithPriority(10, () => {
		this.router.navigate(['/home']);
		//navigator['app'].exitApp();
	});
  }

  ngOnInit() { 
	 
  }

  ionViewWillEnter(){
	this.model.is_volunteer = 0;
	console.log(localStorage.getItem('volunteer_approve'));
	if(localStorage.getItem('volunteer_approve') != null){
		this.model.is_volunteer = localStorage.getItem('volunteer_approve');
	}  
	localStorage.removeItem('receiver_food_type'); 
	localStorage.removeItem('set_confirm_location_route'); 
	localStorage.removeItem('receiver_location'); 
	localStorage.removeItem('food_for_no_of_person');
	this.model.user_id = localStorage.getItem('user_id');

	var self = this;
	self.options = {
		enableHighAccuracy: false,
    };
	self.geolocation.getCurrentPosition(self.options).then((resp) => {
		// let options: NativeGeocoderOptions = {
		// 	useLocale: true,
		// 	maxResults: 5
		// };
		let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
		let geocoder = new google.maps.Geocoder();
	geocoder.geocode({ 'latLng': latLng }, (results, status) => {
		
		
		results[0].address_components.forEach(function(val){
      
			if (val.types[0] == "locality"){
				
				localStorage.setItem('current_city',val.long_name);
				
			}
			  
	
		  });
	});
		
			
		
		 
		
		
	});
  }
	ionViewDidEnter(){
		this.model.key_text1 = "Those who are happiest are those";
		this.model.key_text2 = "who do the most for others.";
		this.model.key_text3 = "Get Food";
		this.model.key_text4 = "Donate Food";
		this.model.key_text5 = "Home";
		this.model.key_text6 = "Activity";
		this.model.key_text7 = "Volunteer";
		var lang_code = JSON.parse(localStorage.getItem('lang'));
		//this.fetch.getKeyText(lang_code).subscribe(res => {
			let res = this.storage.getScope();
			let item1 = res.find(i => i.key_text === 'THOSE_WHO_ARE_HAPPIEST_ARE_THOSE');
				this.model.key_text1 = item1[lang_code];
			let item2 = res.find(i => i.key_text === 'WHO_DO_THE_MOST_FOR_OTHERS.');
				this.model.key_text2 = item2[lang_code];
			let item3 = res.find(i => i.key_text === 'GET_FOOD');
				this.model.key_text3 = item3[lang_code];
			let item4 = res.find(i => i.key_text === 'DONATE_FOOD');
				this.model.key_text4 = item4[lang_code];
			let item5 = res.find(i => i.key_text === 'HOME');
				this.model.key_text5 = item5[lang_code];
			let item6 = res.find(i => i.key_text === 'ACTIVITY');
				this.model.key_text6 = item6[lang_code];
			let item7 = res.find(i => i.key_text === 'VOLUNTEER');
				this.model.key_text7 = item7[lang_code];
		//});
	
	}
  async openModalHome() {
    const modal = await this.modalController.create({
		component: HomeContentPage,
		cssClass: 'custom_filter_modal',
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

  
  go_donate(){
	if(JSON.parse(localStorage.getItem('donor_location')) != null){
		localStorage.removeItem('donor_location');
	}
	this.router.navigate(['/donate-food']);
  }
  get_food_search(){
	if(JSON.parse(localStorage.getItem('get-food-search')) != null){
		localStorage.removeItem('get-food-search');
	}
	this.router.navigate(['/get-food-search']);  
  }
 

}
