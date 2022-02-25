import { Component, OnInit, ViewChild ,ElementRef,NgZone } from '@angular/core';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AlertController } from '@ionic/angular';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Platform,ModalController } from '@ionic/angular';
import { Location } from "@angular/common";
declare var google: any;
declare var $: any;

@Component({
  selector: 'app-on-the-way-search',
  templateUrl: './on-the-way-search.page.html',
  styleUrls: ['./on-the-way-search.page.scss'],
})
export class OnTheWaySearchPage implements OnInit {
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
  markers = [];
 infowindow = new google.maps.InfoWindow();
  options : GeolocationOptions;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  id2: any;
  id: any;
  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private fetch: FetchService,
    private platform: Platform, 
    private location: Location,
    private zone: NgZone,
    public modal : ModalController,
    private storage : StorageService,
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
    this.model.user_id = JSON.parse(localStorage.getItem('user_registerd'));
  }
  ionViewWillEnter(){
    var start = localStorage.getItem('temp_start_address');
    var end = localStorage.getItem('temp_end_address');
    this.id = this.route.snapshot.params['id'];
    this.id2 = this.route.snapshot.params['id2'];
    if(start){
      this.autocomplete.start = start;
    }if(end){
      this.autocomplete.end = end;
    }
    var self = this;
    self.options = {
      enableHighAccuracy: false,
      };
      
    self.geolocation.getCurrentPosition(self.options).then((resp) => {
    
      self.model.LastLat = resp.coords.latitude;
      self.model.LastLng = resp.coords.longitude;
   
      let latLng = new google.maps.LatLng(self.model.LastLat, self.model.LastLng);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      self.map = new google.maps.Map(self.mapElement.nativeElement, mapOptions);
      self.directionsRenderer.setMap(self.map);
     
      
    }); 
  }
  
  ionViewDidEnter(){
    var lang_code = JSON.parse(localStorage.getItem('lang'));
    //this.fetch.getKeyText(lang_code).subscribe(res => {
      let res = this.storage.getScope();
      let item1 = res.find(i => i.key_text === 'CONFIRM');
			this.model.key_text1 = item1[lang_code];
      let item2 = res.find(i => i.key_text === 'NO_VOLUNTEER_FOUND');
			this.model.key_text2 = item2[lang_code];
      let item3 = res.find(i => i.key_text === 'CLOSE');
			this.model.key_text3 = item3[lang_code];
      let item4 = res.find(i => i.key_text === 'CHOOSE_STARTING_POINT');
      this.model.key_text4 = item4[lang_code]; 
      let item5 = res.find(i => i.key_text === 'CHOOSE_DESTINATION');
      this.model.key_text5 = item5[lang_code]; 
		
  }
  dismissSource() {
    this.sources = [];
  }
  dismissDestination() {
    this.destination = [];
  }

  updateSources() {
    console.log('in');
    if(this.autocomplete.start!=''){
      this.geoCode(this.autocomplete.start,'start');
    }
    
  }
  updateDestinations() {
    if(this.autocomplete.end!=''){
      this.geoCode(this.autocomplete.end,'end');
    }
  }

  goToAddressSelection(type){
    this.router.navigate(['/on-the-way-address',type])
  }
 //convert Address string to lat and long
 geoCode(address:any,path) {
  
  let geocoder = new google.maps.Geocoder();
  
  geocoder.geocode({ 'address': address }, (results, status) => {
   var address_components = results[0].address_components;
   var self = this;
   if(path == 'start'){
    address_components.forEach(function(val,i){
      console.log('-',val)
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
  }if(path ==  'end'){
    address_components.forEach(function(val,i){
      console.log('-',val)
      if (val.types[0] == "locality"){
          
          self.model.endCity = val.long_name;
      } 
      if (val.types[0] == "administrative_area_level_1"){
				
				self.model.endState = val.long_name;
			} 
			if (val.types[0] == "country"){
				
				self.model.endCountry = val.long_name;
			}
			if (val.types[0] == "postal_code"){
				
				self.model.endPostalCode = val.long_name;
			}

    });
  }
    if(path == 'start'){
      this.model.startLat = results[0].geometry.location.lat();
      this.model.startLng = results[0].geometry.location.lng();
      this.model.startColonyName = results[0].formatted_address;
      this.showRoutes();
    }
    if(path ==  'end'){
      this.model.endLat = results[0].geometry.location.lat();
      this.model.endLng = results[0].geometry.location.lng();
      this.model.endColonyName = results[0].formatted_address;
      this.showRoutes();
    }
  // alert("lat: " + this.latitude + ", long: " + this.longitude);
 });
 
}
showRoutes(){
  
  if(this.autocomplete.start != '' && this.autocomplete.end != ''){
   let data = JSON.stringify({startLat:this.model.startLat,startLng:this.model.startLng,endLat:this.model.endLat,endLng:this.model.endLng,city:this.model.city,endCity:this.model.endCity,user_id : this.model.user_id});
   this.fetch.get_volunteer_waypoints_by_condition(data).subscribe(res => {
     //console.log(res);
      let waypts = [];
      let waypointsData = [];
      res.data.forEach((val,i)=>{
        waypts.push({
          location: new google.maps.LatLng(val.latitude,val.longitude),
          stopover: true
        });
        waypointsData.push({
          location: new google.maps.LatLng(val.latitude,val.longitude),
          name : val.username,
          mobile_no : val.mobile_no
        });
      });
      this.req_data = res.data;
      this.directionsRenderer.setMap(null);
      this.directionsRenderer.setDirections({routes: []});
      for (var i = 0; i < this.markers.length; i++ ) {
        this.markers[i].setMap(null);
      }
      
      this.directionsService.route(
        {
          origin: this.autocomplete.start ,
          destination: this.autocomplete.end,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK") {
           
            this.directionsRenderer.setDirections(response);
            this.directionsRenderer.setMap(this.map);
            var startLocation = new Object();
            var endLocation = new Object();
            // var waypointLocations = [];
            var legs = response.routes[0].legs;
            console.log(legs);
            for (var i = 0; i < legs.length; i++) {
              if (i == 0) {
                startLocation = legs[i].start_location;
               
              }
              if (i == legs.length - 1) {
                endLocation = legs[i].end_location;
                
              }
              
            }
            //console.log(waypointLocations);
            this.waypoints = waypointsData
            this.createMarker(endLocation, "end", "special text for end marker", 0,"http://www.google.com/mapfiles/markerB.png")
           this.createMarker(startLocation, "start", "special text for start marker",0, "http://maps.gstatic.com/mapfiles/markers2/marker_greenA.png");
            for (var i = 0; i < waypointsData.length; i++) {
              this.createMarker(waypointsData[i].location, waypointsData[i].name, '', waypointsData[i].mobile_no, "");
            }
          
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
  });
  
   
        
  }  
}
createMarker(latlng, label, html, mobile_no, url) {
  if(mobile_no != 0){
    var contentString = '<b>' + label + '</b><br>' + html;
  }else{
    var contentString = '<b>' + label + '</b><br>' + html;
  }
  
  var marker = new google.maps.Marker({
    position: latlng,
    map: this.map,
    icon: {url : url },
    title: label,
    zIndex: Math.round(latlng.lat() * -100000) << 5
  });
  this.markers.push(marker);
  google.maps.event.addListener(marker, 'click', ()=> {
    this.infowindow.setContent(contentString);
    this.infowindow.open(this.map, marker);
  });

  
}
async showAlert(msg){
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class custom_alert_1',
    message: msg,
    buttons: [
      {
        text: this.model.key_text3,
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
         //this.router.navigate(['/home']);
        }
      }
    ]
  });

  await alert.present();
}
confirm(){
  if(this.autocomplete.start != '' && this.autocomplete.end != ''){
    let data = JSON.stringify({startLat:this.model.startLat,startLng:this.model.startLng,endLat:this.model.endLat,endLng:this.model.endLng,endCity:this.model.endCity,'colony_name' : this.model.startColonyName,city:this.model.city,'house_no': null, 'landmark' : null, 'adress_type' : null, 'state' : this.model.state, 'country' : this.model.country, 'postalCode' : this.model.postalCode,app_user_id : this.model.user_id,'id':this.id,'id2':this.id2});
    this.fetch.get_volunteer_waypoints_new(data).subscribe(res => {
      if(res['success'] == true){ 
        if(res['data'].length > 0){
          this.router.navigate(['/searching-volunteer',this.id,this.id2]);
        }else{
          this.showAlert(this.model.key_text2);
          this.router.navigate(['/screen-after-volunteer-not-found',this.id,this.id2]);
        }
      }
   })
  }
}
}
