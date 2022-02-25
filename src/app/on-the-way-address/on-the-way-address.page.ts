import { Component, OnInit, ViewChild ,ElementRef,NgZone } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Platform } from '@ionic/angular';
import { Location } from "@angular/common";
declare var google: any;
declare var $: any;
@Component({
  selector: 'app-on-the-way-address',
  templateUrl: './on-the-way-address.page.html',
  styleUrls: ['./on-the-way-address.page.scss'],
})
export class OnTheWayAddressPage implements OnInit {
  type: any;
  sources;
  destination;
  autocomplete:any={};
  req_data : any = [];
  latitude: number = 0;
  longitude: number = 0;
  geo: any;
  service = new google.maps.places.AutocompleteService();
  model:any={};
  waypoints:any=[];
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true
  });
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  markers = [];
 infowindow = new google.maps.InfoWindow();
  options : GeolocationOptions;
  saved_address: any;
  curr_address: any;
  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public alertController: AlertController,
    private http: HttpClient,
    private fetch: FetchService,
    private platform: Platform, 
    private location: Location,
    private zone: NgZone,
    private storage : StorageService,
    public router : Router,
    public route : ActivatedRoute
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.location.back();
     
    });
    this.sources = [];
    this.destination = [];
    this.autocomplete = {
      start: '',
      end : ''
    };
   }

  ngOnInit() {
  this.type = this.route.snapshot.params['id'];
  }
 ionViewWillEnter(){

  var lang_code = JSON.parse(localStorage.getItem('lang'));
  this.model.user_id = JSON.parse(localStorage.getItem('user_id'));
	this.fetch.get_user_locations(this.model.user_id).subscribe(res => {
		if(res['success'] == true){
		  this.saved_address = res['data'];
		  console.log(this.saved_address);
		  
		  //this.donate_address = res['data'][0];  
		}
	});
  //this.fetch.getKeyText(lang_code).subscribe(res => {
    let res = this.storage.getScope();
    let item1 = res.find(i => i.key_text === 'YOUR_LOCATION');
    this.model.key_text1 = item1[lang_code];
    let item2 = res.find(i => i.key_text === 'CHOOSE_STARTING_POINT');
    this.model.key_text2 = item2[lang_code]; 
    let item3 = res.find(i => i.key_text === 'CHOOSE_DESTINATION');
    this.model.key_text3 = item3[lang_code]; 

  this.type = this.route.snapshot.params['id'];
  var self = this;
    self.options = {
      enableHighAccuracy: false,
      };
      
    self.geolocation.getCurrentPosition(self.options).then((resp) => {
    
      self.model.LastLat = resp.coords.latitude;
      self.model.LastLng = resp.coords.longitude;
      this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);
   
      let latLng = new google.maps.LatLng(self.model.LastLat, self.model.LastLng);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
     
      
    });
 
  }
  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.curr_address = this.generateAddress(result[0]);
        console.log('your location',this.curr_address);
      })
      .catch((error: any) => {
       // alert('Error getting location' + JSON.stringify(error));
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
  dismissSource() {
    this.sources = [];
  }
  dismissDestination() {
    this.destination = [];
  }
  chooseSource(item: any) {
    this.sources = [];
    this.autocomplete.start = item;
    localStorage.setItem('temp_start_address',this.autocomplete.start)
    this.location.back();
    this.geo = item;
    //this.geoCode(this.geo,'start');//convert Address to lat and long
  }
  chooseDestination(item: any) {
    this.destination = [];
    this.autocomplete.end = item;
    localStorage.setItem('temp_end_address',this.autocomplete.end)
    this.location.back();
    this.geo = item;
    //this.geoCode(this.geo,'end');//convert Address to lat and long
  }
  saveAdd(add){
    if(this.type == 1){
      localStorage.setItem('temp_start_address',add)
    this.location.back();
    }else{
      localStorage.setItem('temp_end_address',add)
    this.location.back();
    }
    
  }
  updateSources() {
    
    var center = { lat: this.model.LastLat, lng: this.model.LastLng };
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
          //fields: ["address_components", "geometry","icon", "name"],
          strictBounds: true,
          types: ["establishment"],
        };
        var input = document.getElementById("my_test") as HTMLInputElement;
        var autocomplete = new google.maps.places.Autocomplete(input, options);
        autocomplete.addListener("place_changed", () => {
        var start_address = autocomplete.getPlace();
        this.autocomplete.start = start_address.formatted_address;
        localStorage.setItem('temp_start_address',this.autocomplete.start)
        this.location.back();
      })

    // if ( this.autocomplete.start == '') {
    //  this.sources = [];
    // return;
    // }

    
     
    //   let me = this;
    //     this.service.getPlacePredictions({
          
    //     input: this.autocomplete.start,
    //     componentRestrictions: {
    //       country: 'in'
    //     }
    //   }, (predictions, status) => {
    //   me.sources = [];

    //   me.zone.run(() => {
    //     if (predictions != null) {
    //         predictions.forEach((prediction) => {
    //           me.sources.push(prediction.description);
    //         });
    //       }
    //     });
    //   });
    
  }
  updateDestinations() {
    
    var center = { lat: this.model.LastLat, lng: this.model.LastLng };
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
          //fields: ["address_components", "geometry","icon", "name"],
          strictBounds: true,
          types: ["establishment"],
        };
        var input = document.getElementById("my_test2") as HTMLInputElement;
        var autocomplete = new google.maps.places.Autocomplete(input, options);
        autocomplete.addListener("place_changed", () => {
        var end_address = autocomplete.getPlace();
        this.autocomplete.end = end_address.formatted_address;
        localStorage.setItem('temp_end_address',this.autocomplete.end)
        this.location.back();
         //console.log(place);
    
        })

    // if ( this.autocomplete.end == '') {
    //  this.destination = [];
    // return;
    // }

    
     
    //   let me = this;
    //     this.service.getPlacePredictions({
    //     input: this.autocomplete.end,
    //     componentRestrictions: {
    //       country: 'in'
    //     }
    //   }, (predictions, status) => {
    //   me.destination = [];

    //   me.zone.run(() => {
    //     if (predictions != null) {
    //         predictions.forEach((prediction) => {
    //           me.destination.push(prediction.description);
    //         });
    //       }
    //     });
    //   });
    
  }
  getYourLocation(){
    if(this.type == 1){
      localStorage.setItem('temp_start_address',this.curr_address);
    this.location.back();
    }else{
      localStorage.setItem('temp_end_address',this.curr_address);
    this.location.back();
    }
  }  
}
