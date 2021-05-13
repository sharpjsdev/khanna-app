import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NotificationPage } from '../modal/notification/notification.page';
import { environment } from '../../environments/environment';
import { CallNumber } from '@ionic-native/call-number/ngx';
declare var google: any;
declare var $: any;

@Component({
  selector: 'app-volunteer-request',
  templateUrl: './volunteer-request.page.html',
  styleUrls: ['./volunteer-request.page.scss'],
  providers : [CallNumber],
})
export class VolunteerRequestPage implements OnInit {
model:any={};
req_data : any = [];
notification:any=[];
dataReturned: any;
@ViewChild('map') mapElement: ElementRef;
map: any;
  options : GeolocationOptions;
  constructor(
	public modalController: ModalController,
	private geolocation: Geolocation,
	private nativeGeocoder: NativeGeocoder,
	private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
	private callNumber: CallNumber,
	private storage : StorageService
  ) { }

  ngOnInit(){

  }
  ionViewWillEnter() {
	
	var user_id = JSON.parse(localStorage.getItem('user_registerd'));
	this.model.user_id = user_id;
	this.fetch.v_check(user_id).subscribe(res => {
		//alert(res.data);
		console.log(res);
		if(res.success == true){
			this.model.status = res.status;
			this.model.volunteer_id = res.data; 
		}else{
			this.model.status = 0;
		}
		});
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	//this.fetch.getKeyText(lang_code).subscribe(res => {
	let res = this.storage.getScope();	
		let item1 = res.find(i => i.key_text === 'NEAREST_VOLUNTEER_LOCATIONS');
			this.model.key_text1 = item1[lang_code];
		let item2 = res.find(i => i.key_text === 'PEOPLE');
			this.model.key_text2 = item2[lang_code];	
		let item3 = res.find(i => i.key_text === 'VEG');
			this.model.key_text3 = item3[lang_code];
		let item4 = res.find(i => i.key_text === 'NON_VEG');
			this.model.key_text4 = item4[lang_code];
		
		let item5 = res.find(i => i.key_text === 'FOOD');
			this.model.key_text5 = item5[lang_code];
		let item6 = res.find(i => i.key_text === 'WAITING');
			this.model.key_text6 = item6[lang_code];
		let item7 = res.find(i => i.key_text === 'NEARBY_OTHER_VOLUNTEER');
			this.model.key_text7 = item7[lang_code];
		let item8 = res.find(i => i.key_text === 'REQUEST_FOOD');
			this.model.key_text8 = item8[lang_code];	
		let item10 = res.find(i => i.key_text === 'HOME');
			this.model.key_text10 = item10[lang_code];
		let item11 = res.find(i => i.key_text === 'ACTIVITY');
			this.model.key_text11 = item11[lang_code];
		let item12 = res.find(i => i.key_text === 'VOLUNTEER');
			this.model.key_text12 = item12[lang_code];
		let item13 = res.find(i => i.key_text === 'FOR');
			this.model.key_text13 = item13[lang_code];
		let item14 = res.find(i => i.key_text === 'DONATE_FOOD');
			this.model.key_text14 = item14[lang_code];	
			
    	let item15 = res.find(i => i.key_text === 'CURRENT_LOCATION');
			this.model.key_text15 = item15[lang_code]; 
		let item16 = res.find(i => i.key_text === 'SHOW_IN_BETWEEN');
			this.model.key_text16 = item16[lang_code]; 
		   
    
					
							 
	//});
	// var self = this;
	// self.options = {
	// 	enableHighAccuracy: false,
    // };
	// self.geolocation.getCurrentPosition(self.options).then((resp) => {
	// 	// let options: NativeGeocoderOptions = {
	// 	// 	useLocale: true,
	// 	// 	maxResults: 5
	// 	// };
	// 	let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
	// 	let geocoder = new google.maps.Geocoder();
	// geocoder.geocode({ 'latLng': latLng }, (results, status) => {
		
	// 	self.model.colony_name = results[0].formatted_address;
	// 	results[0].address_components.forEach(function(val,i){
      
	// 		if (val.types[0] == "locality"){
				
	// 			self.model.city = val.long_name;

	// 			let data = JSON.stringify({'city' : self.model.city});
	// 			self.fetch.req_list(data).subscribe(res => {
					
	// 				self.req_data = res.data;
	// 				let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
	// 				let mapOptions = {
	// 					center: latLng,
	// 					zoom: 15,
	// 					mapTypeId: google.maps.MapTypeId.ROADMAP
	// 				}
	// 				self.map = new google.maps.Map(self.mapElement.nativeElement, mapOptions);
	// 				var infowindow = new google.maps.InfoWindow();
	// 				var marker;
	// 				for(var i = 0; i < self.req_data.length; i++){
	// 					let marker = new google.maps.Marker({
	// 						map: self.map,
	// 						position: new google.maps.LatLng(self.req_data[i].latitude, self.req_data[i].longitude),
	// 					});
	// 					google.maps.event.addListener(marker, 'click', (function(marker, i) {
	// 						return function() {
	// 						infowindow.setContent(self.req_data[i].colony_name);
	// 						infowindow.open(self.map, marker);
	// 						}
	// 					})(marker, i));
	// 				}
	// 			});
	// 		}
	// 		if (val.types[0] == "administrative_area_level_1"){
				
	// 			self.model.state = val.long_name;
	// 		} 
	// 		if (val.types[0] == "country"){
				
	// 			self.model.country = val.long_name;
	// 		}
	// 		if (val.types[0] == "postal_code"){
				
	// 			self.model.postalCode = val.long_name;
	// 		}   
	
	// 	  });
	// });
		
			
		
		 
		
		
	// }); 
	var self = this;
	let current_city = localStorage.getItem('current_city');
	let data = JSON.stringify({'city' : current_city,'user_id' : this.model.user_id});
	self.options = {
			enableHighAccuracy: false,
		};
		
	self.fetch.req_list(data).subscribe(res => {
					
					self.req_data = res.data;
					self.geolocation.getCurrentPosition(self.options).then((resp) => {
					let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
					let mapOptions = {
						center: latLng,
						zoom: 15,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					}
					self.map = new google.maps.Map(self.mapElement.nativeElement, mapOptions);
					var infowindow = new google.maps.InfoWindow();
					var marker;
					for(var i = 0; i < self.req_data.length; i++){
						let marker = new google.maps.Marker({
							map: self.map,
							position: new google.maps.LatLng(self.req_data[i].latitude, self.req_data[i].longitude),
						});
						google.maps.event.addListener(marker, 'click', (function(marker, i) {
							return function() {
							infowindow.setContent(self.req_data[i].colony_name);
							infowindow.open(self.map, marker);
							}
						})(marker, i));
					}
				});
				});

	 
  }
  changeChoice(value){
	
	this.router.navigate(['/show-in-between']);
 }
  call(number){
	
	let data = JSON.stringify({'caller_id':this.model.user_id,'callee_mobile_no':number  });
			$('#add_location_spinner').show();
				this.fetch.add_call_detail(data).subscribe(res => {
					this.callNumber.callNumber(environment.phone_no, true)
					.then(res => { $('#add_location_spinner').show(); console.log('Launched dialer!', res); })
					.catch(err => console.log('Error launching dialer', err));
				});
 }

}
