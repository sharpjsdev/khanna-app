import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from '../../fetch.service';

declare var google: any;
declare var $: any;
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';

@Component({
  selector: 'app-current-location-content',
  templateUrl: './current-location-content.page.html',
  styleUrls: ['./current-location-content.page.scss'],
})
export class CurrentLocationContentPage implements OnInit {
model:any={};
options : GeolocationOptions;
@ViewChild('map') mapElement: ElementRef;
map: any;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
	private geolocation: Geolocation,
	private nativeGeocoder: NativeGeocoder,
	private router: Router,
	private fetch: FetchService
  ) { 
  var self = this;
		self.options = {
    enableHighAccuracy: false,
    };
		 self.geolocation.getCurrentPosition(self.options).then((resp) => {
			 $('#location_spinner').css('display','none');
			 $('.current_location_page_show').css('display','block');
			self.model.lat = resp.coords.latitude;
			self.model.lon = resp.coords.longitude;
			console.log('lat :'+ self.model.lat, 'lon :' + self.model.lon);
			
			self.showAddress(self.model.lat, self.model.lon);
			let latLng = new google.maps.LatLng(self.model.lat, self.model.lon);

		let mapOptions = {
		center: latLng,
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		self.map = new google.maps.Map(self.mapElement.nativeElement, mapOptions);
		
		self.addMarker();
		
		}); 

  }

  async ngOnInit() {
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	this.fetch.getKeyText(lang_code).subscribe(res => {
		let item1 = res.find(i => i.key_text === 'CONFIRM_LOCATION');
			this.model.key_text1 = item1[lang_code]; 
	});
	this.model.confirm_route = JSON.parse(localStorage.getItem('set_confirm_location_route'));
	if(this.model.confirm_route == null){
		this.model.confirm_route = 'donate-food';
	}
	console.log(this.model.confirm_route);
	
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
	  this.model.lat = this.model.LastLat;
	  this.model.lon = this.model.LastLng;
	  this.showAddress(this.model.LastLat, this.model.LastLng);
    });
    }

showAddress(lat, lon){
	let options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
};

this.nativeGeocoder.reverseGeocode(lat, lon, options)
  .then((result: NativeGeocoderResult[]) => {
  this.model.colony_name = result[0].subLocality;
  this.model.city = result[0].locality;
  this.model.state = result[0].administrativeArea;
  this.model.country = result[0].countryName;
  this.model.postalCode = result[0].postalCode;
  if(this.model.confirm_route == "donate-food"){
  this.model.data = JSON.stringify({'app_user_id': JSON.parse(localStorage.getItem('user_id')),'house_no': null, 'landmark' : null, 'adress_type' : null, 'latitude' : this.model.lat, 'longitude' : this.model.lon,'colony_name' : this.model.colony_name, 'city' : this.model.city, 'state' : this.model.state, 'country' : this.model.country, 'postalCode' : this.model.postalCode });
		localStorage.setItem('donor_location', this.model.data);
		//alert(JSON.stringify(this.model.data));
  }
  if(this.model.confirm_route == "get-food-search"){
	this.model.data = JSON.stringify({'latitude' : this.model.lat, 'longitude' : this.model.lon,'colony_name' : this.model.colony_name, 'city' : this.model.city, 'state' : this.model.state, 'country' : this.model.country, 'postalCode' : this.model.postalCode });
		localStorage.setItem('receiver_location', this.model.data);  
  }
  if(this.model.confirm_route == "register-volunteer"){
	this.model.data = JSON.stringify({'latitude' : this.model.lat, 'longitude' : this.model.lon,'colony_name' : this.model.colony_name, 'city' : this.model.city, 'state' : this.model.state, 'country' : this.model.country, 'postalCode' : this.model.postalCode });  
	//alert(JSON.stringify(this.model.data));
  }
  })
  .catch((error: any) => console.log(error));
}
confirm_location(){
	/* if(this.model.confirm_route == "donate-food" || this.model.confirm_route == null){
		
		  this.router.navigate(['/donate-food']);
	}else {
		this.router.navigate(['/'+this.model.confirm_route]);
	} */
}

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
  current_location(){
	//alert(JSON.stringify(this.model.data));
	this.modalController.dismiss(this.model.data);
  }
 
}
