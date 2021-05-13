import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Location } from "@angular/common";

declare var google: any;
declare var $: any;

@Component({
  selector: 'app-saved-addresses-add',
  templateUrl: './saved-addresses-add.page.html',
  styleUrls: ['./saved-addresses-add.page.scss'],
})
export class SavedAddressesAddPage implements OnInit {
  model:any={};
  options : GeolocationOptions;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  constructor(
	private geolocation: Geolocation,
	private nativeGeocoder: NativeGeocoder,
	public alertController: AlertController,
	private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
	private storage: StorageService,
	private platform: Platform, 
	private location: Location
	) { 
	this.platform.backButton.subscribeWithPriority(10, () => {
		this.location.back();
	});
  }
  ngOnInit() {
	this.model.search = false;
  }
  ionViewWillEnter() {
	
	//$('.current_location_page_show').hide();  
	//$('#add_t_1').addClass('active');
	this.model.alert_text = 'Please fill all the details';
	this.model.okay = 'okay';
	this.model.zoom =15;
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	//this.fetch.getKeyText(lang_code).subscribe(res => {
		let res = this.storage.getScope();
		let item1 = res.find(i => i.key_text === 'HOUSE');
			this.model.key_text1 = item1[lang_code]; 
		let item2 = res.find(i => i.key_text === 'FLAT');
			this.model.key_text2 = item2[lang_code]; 
		let item3 = res.find(i => i.key_text === 'BLOCK');
			this.model.key_text3 = item3[lang_code]; 
		let item4 = res.find(i => i.key_text === 'LANDMARK');
			this.model.key_text4 = item4[lang_code]; 
		let item5 = res.find(i => i.key_text === 'HOME');
			this.model.key_text5 = item5[lang_code]; 
		let item6 = res.find(i => i.key_text === 'WORK');
			this.model.key_text6 = item6[lang_code]; 
		let item7 = res.find(i => i.key_text === 'OTHER');
			this.model.key_text7 = item7[lang_code]; 
		let item8 = res.find(i => i.key_text === 'ADD_LOCATION');
			this.model.key_text8 = item8[lang_code]; 
		let item9 = res.find(i => i.key_text === 'PLEASE_FILL_ALL_THE_DETAILS');
			this.model.alert_text = item9[lang_code]; 
		let item10 = res.find(i => i.key_text === 'OKAY');
			this.model.okay = item10[lang_code];
		let item11 = res.find(i => i.key_text === 'SAVE_AS');
			this.model.key_text11 = item11[lang_code];		 
				
	//});
	var self = this;
	self.options = {
		enableHighAccuracy: false,
    };
	self.geolocation.getCurrentPosition(self.options).then((resp) => {
		
		$('#add_location_spinner').css('display','none');
		$('.current_location_page_show').css('display','block');
		self.model.LastLat = resp.coords.latitude;
		self.model.LastLng = resp.coords.longitude;
		console.log('lat :'+ self.model.LastLat, 'lon :' + self.model.LastLng);
		self.showAddress(self.model.LastLat, self.model.LastLng);
		let latLng = new google.maps.LatLng(self.model.LastLat, self.model.LastLng);
		let mapOptions = {
			center: latLng,
			zoom: self.model.zoom,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		self.map = new google.maps.Map(self.mapElement.nativeElement, mapOptions);
		
		self.addMarker();
		self.map.addListener('zoom_changed', ()=>{
			var zoom = self.map.getZoom();
			self.model.zoom = zoom;
		});
	}); 
	
  }
  addMarker(){

    let marker = new google.maps.Marker({
		map: this.map,
		animation: google.maps.Animation.DROP,
		position: this.map.getCenter(),
		draggable: true
    });

    let content = "<p>This is your current position !</p>";          
    let infoWindow = new google.maps.InfoWindow({
		content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
		infoWindow.open(this.map, marker);
    });
	this.lastLatLng(marker);
  }
  lastLatLng(marker){
    google.maps.event.addListener(marker, 'dragend', () =>{
		
        this.model.LastLat= marker.position.lat();
		this.model.LastLng= marker.position.lng();
		this.showAddress(this.model.LastLat,this.model.LastLng);
    });
  }

  showAddress(lat, lon){
	
	var self = this;
	let latLng = new google.maps.LatLng(lat, lon);
	let geocoder = new google.maps.Geocoder();
	geocoder.geocode({ 'latLng': latLng }, (results, status) => {
		
		this.model.colony_name = results[0].formatted_address;
		results[0].address_components.forEach(function(val,i){
      
			if (val.types[0] == "locality"){
				
				self.model.city = val.long_name;
			}
			if (val.types[0] == "administrative_area_level_1"){
				
				self.model.state = val.long_name;
			} 
			if (val.types[0] == "country"){
				
				self.model.country = val.long_name;
			}
			if (val.types[0] == "postal_code"){
				
				self.model.postalCode = val.long_name;
			}   
	
		  });
	});
	// let options: NativeGeocoderOptions = {
	// 	useLocale: true,
	// 	maxResults: 5
	// };

	// this.nativeGeocoder.reverseGeocode(lat, lon, options).then((result: NativeGeocoderResult[]) => {
	// 	console.log(result);
		
	// 	this.model.colony_name = result[0].areasOfInterest[0]+' '+result[0].subLocality;
	// 	this.model.city = result[0].locality;
	// 	this.model.state = result[0].administrativeArea;
	// 	this.model.country = result[0].countryName;
	// 	this.model.postalCode = result[0].postalCode
	// }).catch((error: any) => console.log(error));
  }

  address_type(val){
	this.model.address_type = val;
	if(val == 1){
		$('#add_t_'+val).addClass('active');  
		$('#add_t_2').removeClass('active');  
		$('#add_t_3').removeClass('active');  
	}else if(val == 2){
		$('#add_t_'+val).addClass('active');  
		$('#add_t_1').removeClass('active');  
		$('#add_t_3').removeClass('active');    
	}else{
		$('#add_t_'+val).addClass('active');  
		$('#add_t_1').removeClass('active');  
		$('#add_t_2').removeClass('active');     
	}
  }
  save(){
	this.model.search = true;
	var house_no = $('#add_location_house_no').val();
	var landmark = $('#add_location_landmark').val();
	// var address_type = this.model.address_type;
	var save_as = $('#save_as').val();
	// if(house_no == ""){
	// 	this.presentAlert("House No. field is required");
	// }else 
	if(landmark == ""){
		this.model.search = false;
		this.presentAlert("Landmark field is required");
	}else if(save_as == ""){
		this.model.search = false;
		this.presentAlert("Save as field is required");
	}else{
		this.model.user_id = JSON.parse(localStorage.getItem('user_id'));
		let data = JSON.stringify({'zoom':this.model.zoom,'app_user_id' : this.model.user_id, 'house_no' : house_no, 'landmark' : landmark, 'address_type' : save_as, 'latitude' : this.model.LastLat, 'longitude' : this.model.LastLng,'colony_name' : this.model.colony_name, 'city' : this.model.city, 'state' : this.model.state, 'country' : this.model.country, 'postalCode' : this.model.postalCode });
		//alert(data);
		this.fetch.add_location(data).subscribe(res => {
			this.model.search = false;
			console.log(res);
			//alert(res.success);
			if(res.success == true){
				this.router.navigate(['/saved-addresses',this.model.user_id]);
			}
		});
	}
  }
  async presentAlert(msg) {
	const alert = await this.alertController.create({
		cssClass: 'my-custom-class',
		header: msg,
		buttons: [this.model.okay]
	});
	await alert.present();
  }
  close_btn(){
	  this.location.back();
	 
  }

}
