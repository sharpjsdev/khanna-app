import { Component, OnInit, ViewChild ,ElementRef,NgZone } from '@angular/core';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { FetchService } from '../../fetch.service';
import { StorageService } from '../../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Platform,ModalController } from '@ionic/angular';
import { Location } from "@angular/common";
declare var google: any;
declare var $: any;

@Component({
  selector: 'app-on-the-way',
  templateUrl: './on-the-way.page.html',
  styleUrls: ['./on-the-way.page.scss'],
})
export class OnTheWayPage implements OnInit {
  sources;
  destination;
  autocomplete:any={};

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
  time_c: any;
  distance_c: any;
  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private route: ActivatedRoute,
    private router: Router,
    private fetch: FetchService,
    private platform: Platform, 
    private location: Location,
    public modalController : ModalController,
    private zone: NgZone,
    private storage: StorageService
  ) { 
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
    var self = this;
    self.options = {
      enableHighAccuracy: false,
      };
      
    self.geolocation.getCurrentPosition(self.options).then((resp) => {
    
      self.model.LastLat = resp.coords.latitude;
      self.model.LastLng = resp.coords.longitude;
      //self.getCurrentCity(resp.coords.latitude,resp.coords.longitude);
      
      let latLng = new google.maps.LatLng(self.model.LastLat, self.model.LastLng);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      self.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      self.directionsRenderer.setMap(self.map);
     
      
    }); 
  }

  ionViewDidEnter(){
    var lang_code = JSON.parse(localStorage.getItem('lang'));
    //this.fetch.getKeyText(lang_code).subscribe(res => {
     let res = this.storage.getScope(); 
      let item1 = res.find(i => i.key_text === 'CONFIRM_LOCATION');
			this.model.key_text1 = item1[lang_code]; 
      let item2 = res.find(i => i.key_text === 'CHOOSE_STARTING_POINT');
			this.model.key_text2 = item2[lang_code]; 
      let item3 = res.find(i => i.key_text === 'CHOOSE_DESTINATION');
			this.model.key_text3 = item3[lang_code]; 
		   
    //});
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
    this.geo = item;
    this.geoCode(this.geo,'start');//convert Address to lat and long
  }
  chooseDestination(item: any) {
    this.destination = [];
    this.autocomplete.end = item;
    this.geo = item;
    this.geoCode(this.geo,'end');//convert Address to lat and long
  }

  updateSources() {
    //alert(this.model.LastLat);
    //alert(this.model.LastLng);
    
     
    //console.log('-',input);
    // if ( this.autocomplete.start == '') {
    //  this.sources = [];
    // return;
    // }

    var center = { lat: this.model.LastLat, lng: this.model.LastLng };
// Create a bounding box with sides ~10km away from the center point
    var defaultBounds = {
      north: center.lat + 0.3,
      south: center.lat - 0.3,
      east: center.lng + 0.3,
      west: center.lng - 0.3,
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
    this.autocomplete.start = start_address.formatted_address
    console.log(this.autocomplete.start)
    this.geoCode(this.autocomplete.start,'start');
     //console.log(place);

    })
    // var options = {
    //   //language: 'en-GB',
    //   types: ['(Ujjain)'],
    //   componentRestrictions: { country: "in" }
    // }

    // var input = $('.address-search');
    // var d = new google.maps.places.Autocomplete(input[0],options);
    // console.log(input[0]);
    // this.sources.push(d);
      // let me = this;
      //   this.service.getPlacePredictions({
      //   input: this.autocomplete.start,
      //   types: [this.model.currnet_city_name],
      //   componentRestrictions: {
      //     country: 'in'
      //   }
      // }, (predictions, status) => {
      // me.sources = [];

      // me.zone.run(() => {
      //   if (predictions != null) {
      //       predictions.forEach((prediction) => {
      //         me.sources.push(prediction.description);
      //       });
      //     }
      //   });
      // });
    
  }
  updateDestinations() {
    
    var center = { lat: this.model.LastLat, lng: this.model.LastLng };
    // Create a bounding box with sides ~10km away from the center point
        var defaultBounds = {
          north: center.lat + 0.3,
          south: center.lat - 0.3,
          east: center.lng + 0.3,
          west: center.lng - 0.3,
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
        this.geoCode(this.autocomplete.end,'end');
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
        console.log(this.model.startLat);
        console.log(this.model.startLng);
        this.showRoutes();
      }
      if(path ==  'end'){
        this.model.endLat = results[0].geometry.location.lat();
        this.model.endLng = results[0].geometry.location.lng();
        console.log(this.model.endLat);
        console.log(this.model.endLng);
        this.showRoutes();
      }
    // alert("lat: " + this.latitude + ", long: " + this.longitude);
   });
   
 }

 showRoutes(){
  
  if(this.autocomplete.start != '' && this.autocomplete.end != ''){
   
   
      
      this.directionsRenderer.setMap(null);
      this.directionsRenderer.setDirections({routes: []});
      for (var i = 0; i < this.markers.length; i++ ) {
        this.markers[i].setMap(null);
      }
      
      this.directionsService.route(
        {
          origin: this.autocomplete.start ,
          destination: this.autocomplete.end,
          waypoints: [],
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
                this.time_c = legs[i].duration.text;
                this.distance_c = legs[i].distance.text;
               
              }
              // if (i != 0 && i != legs.length - 1) { 
              //   var waypoint = {latlng : '', address : ''};
              //   waypoint.latlng = legs[i].start_location;
              //   waypoint.address = legs[i].start_address;
              //   waypointLocations.push(waypoint);
              // }
              if (i == legs.length - 1) {
                endLocation = legs[i].end_location;
                
              }
              
            }
            //console.log(waypointLocations);
            
            this.createMarker(endLocation, "end", "special text for end marker", 0,"http://www.google.com/mapfiles/markerB.png")
           this.createMarker(startLocation, "start", "special text for start marker",0, "http://maps.gstatic.com/mapfiles/markers2/marker_greenA.png");
            
          
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
  
  
   
        
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
async closeModal() {
  const onClosedData = [];
  await this.modalController.dismiss(onClosedData);
}
current_location(){
	//alert(JSON.stringify(this.model.data));
  let data = [];
  if(this.autocomplete.start && this.autocomplete.end){
     data.push(this.model);
     data.push(this.autocomplete);
  }
    this.modalController.dismiss(data);
  }
  blank(val){
    if(val == 'start'){
      this.autocomplete.start = '';
      $("#my_test").val('');
    }else{
      this.autocomplete.end = '';
      $("#my_test2").val('');
    }
  }
  // getCurrentCity(lat, lon){
  //   var self = this;
  //   let latLng = new google.maps.LatLng(lat, lon);
  //   let geocoder = new google.maps.Geocoder();
  //   geocoder.geocode({ 'latLng': latLng }, (results, status) => {
      
  //     this.model.colony_name = results[0].formatted_address;
  //     results[0].address_components.forEach(function(val,i){
        
  //       if (val.types[0] == "locality"){
          
  //         self.model.currnet_city_name = val.long_name;
  //       }
    
  //       });
  //   });
  // }
}
