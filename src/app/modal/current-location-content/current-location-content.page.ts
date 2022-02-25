import { Component, OnInit, ViewChild ,ElementRef , NgZone , Input} from '@angular/core';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from '../../fetch.service';
import { StorageService } from '../../storage.service';
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
  @Input() paramTitle;
  model:any={};
sources;
destination;
geo: any;
autocomplete:any={};
service = new google.maps.places.AutocompleteService();
directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true
  });
  markers = [];
 infowindow = new google.maps.InfoWindow();
options : GeolocationOptions;
@ViewChild('map') mapElement: ElementRef;
map: any;
	saved_address: any;
	marker: any;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
	private geolocation: Geolocation,
	private nativeGeocoder: NativeGeocoder,
	private router: Router,
	private fetch: FetchService,
	private storage : StorageService,
	private zone: NgZone,
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
		let res = this.storage.getScope();
		if(this.paramTitle == 'donate_food'){
      let item1 = res.find(i => i.key_text === 'CONFIRM_PICKUP_POINT');
			this.model.key_text1 = item1[lang_code];
    }else{
      let item1 = res.find(i => i.key_text === 'CONFIRM_LOCATION');
			this.model.key_text1 = item1[lang_code];
    }
     
    let item2 = res.find(i => i.key_text === 'SEARCH');
			this.model.key_text2 = item2[lang_code];
	//});
	this.model.confirm_route = JSON.parse(localStorage.getItem('set_confirm_location_route'));
	if(this.model.confirm_route == null){
		this.model.confirm_route = 'donate-food';
	}
	console.log(this.model.confirm_route);
	this.model.user_id = JSON.parse(localStorage.getItem('user_id'));
	this.fetch.get_user_locations(this.model.user_id).subscribe(res => {
		if(res['success'] == true){
		  this.saved_address = res['data'];
		}
	});
}
dismissSource(){
	this.sources = [];
}

addMarker(){
    this.marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter(),
	draggable: true
    });

    let content = "<p>This is your current position !</p>";          
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });

    google.maps.event.addListener(this.marker, 'click', () => {
    infoWindow.open(this.map, this.marker);
    });
	this.lastLatLng(this.marker);
}
addMarker2(lat, lng){
	this.marker.setMap(null);
	this.showAddress(lat , lng)
	let mapOptions = {
		center: new google.maps.LatLng(lat, lng),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		}

	this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: new google.maps.LatLng(lat, lng),
	draggable: true
    });
    let content = "<p>This is your current position !</p>";          
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });

    google.maps.event.addListener(this.marker, 'click', () => {
    infoWindow.open(this.map, this.marker);
    });
	this.lastLatLng(this.marker);
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
	});
}
confirm_location(){
}

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss('');
  }
  current_location(){
	this.modalController.dismiss(this.model.data);
  }
  blank(val){
    if(val == 'start'){
      this.autocomplete.start = '';
      $("#my_test").val('');
    }
  }
  updateSources() {
    var center = { lat: this.model.lat, lng: this.model.lon };
    // Create a bounding box with sides ~10km away from the center point
        var defaultBounds = {
          north: center.lat + 0.2,
          south: center.lat - 0.2,
          east: center.lng + 0.2,
          west: center.lng - 0.2,
        };
      
        var options = {
          bounds: defaultBounds,
          componentRestrictions: { country: "in" },
          strictBounds: true,
          types: ["establishment"],
        };
        var input = document.getElementById("my_test") as HTMLInputElement;
        var autocomplete = new google.maps.places.Autocomplete(input, options);
        autocomplete.addListener("place_changed", () => {
        var start_address = autocomplete.getPlace();
        this.autocomplete.start = start_address.formatted_address;
        this.geoCode(this.autocomplete.start,'start');
         //console.log(place);
    
        })
    
  }
  chooseSource(item: any) {
    this.sources = [];
    this.autocomplete.start = item;
    this.geo = item;
    this.geoCode(this.geo,'start');//convert Address to lat and long
  }
  //convert Address string to lat and long
  geoCode(address:any,path) {
    console.log(address);
    let geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ 'address': address }, (results, status) => {
     var address_components = results[0].address_components;
     var self = this;
      address_components.forEach(function(val,i){
        
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
      if(path == 'start'){
        this.model.startLat = results[0].geometry.location.lat();
        this.model.startLng = results[0].geometry.location.lng();
		this.addMarker2(this.model.startLat,this.model.startLng );
      }
    // alert("lat: " + this.latitude + ", long: " + this.longitude);
   });
   
 }

}
