import { Component, OnInit, ViewChild ,ElementRef,NgZone } from '@angular/core';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Platform,ModalController } from '@ionic/angular';
import { Location } from "@angular/common";
import { CallNumber } from '@ionic-native/call-number/ngx';
declare var google: any;
declare var $: any;

@Component({
  selector: 'app-show-in-between',
  templateUrl: './show-in-between.page.html',
  styleUrls: ['./show-in-between.page.scss'],
  providers : [CallNumber],
})
export class ShowInBetweenPage implements OnInit {
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
  constructor(
	private geolocation: Geolocation,
	private nativeGeocoder: NativeGeocoder,
	public alertController: AlertController,
	private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
	private platform: Platform, 
  private location: Location,
  private zone: NgZone,
  public modal : ModalController,
  private callNumber: CallNumber,
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
    
    var self = this;
    self.options = {
      enableHighAccuracy: false,
      };
      
    self.geolocation.getCurrentPosition(self.options).then((resp) => {
    
      self.model.LastLat = resp.coords.latitude;
      self.model.LastLng = resp.coords.longitude;
     console.log(self.model.LastLat);
   
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
    
    if ( this.autocomplete.start == '') {
     this.sources = [];
    return;
    }

    
     
      let me = this;
        this.service.getPlacePredictions({
        input: this.autocomplete.start,
        componentRestrictions: {
          country: 'in'
        }
      }, (predictions, status) => {
      me.sources = [];

      me.zone.run(() => {
        if (predictions != null) {
            predictions.forEach((prediction) => {
              me.sources.push(prediction.description);
            });
          }
        });
      });
    
  }
  updateDestinations() {
    
    if ( this.autocomplete.end == '') {
     this.destination = [];
    return;
    }

    
     
      let me = this;
        this.service.getPlacePredictions({
        input: this.autocomplete.end,
        componentRestrictions: {
          country: 'in'
        }
      }, (predictions, status) => {
      me.destination = [];

      me.zone.run(() => {
        if (predictions != null) {
            predictions.forEach((prediction) => {
              me.destination.push(prediction.description);
            });
          }
        });
      });
    
  }

  //convert Address string to lat and long
  geoCode(address:any,path) {
    let geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ 'address': address }, (results, status) => {
     var address_components = results[0].address_components;
     var self = this;
      address_components.forEach(function(val,i){
      
        if (val.types[0] == "locality"){
            
            self.model.city = val.long_name;
        } 

      });
      if(path == 'start'){
        this.model.startLat = results[0].geometry.location.lat();
        this.model.startLng = results[0].geometry.location.lng();
        this.showRoutes();
      }
      if(path ==  'end'){
        this.model.endLat = results[0].geometry.location.lat();
        this.model.endLng = results[0].geometry.location.lng();
        this.showRoutes();
      }
    // alert("lat: " + this.latitude + ", long: " + this.longitude);
   });
   
 }
 changeChoice(value){
   
    
    this.router.navigate(['/volunteer-request']);
 }
 showRoutes(){
  
    if(this.autocomplete.start != '' && this.autocomplete.end != ''){
     let data = JSON.stringify({startLat:this.model.startLat,startLng:this.model.startLng,endLat:this.model.endLat,endLng:this.model.endLng,city:this.model.city,user_id : this.model.user_id});
     this.fetch.get_volunteer_waypoints(data).subscribe(res => {
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
              this.waypoints = waypointsData
              this.createMarker(endLocation, "end", "special text for end marker", 0,"http://www.google.com/mapfiles/markerB.png")
             this.createMarker(startLocation, "start", "special text for start marker",0, "http://maps.gstatic.com/mapfiles/markers2/marker_greenA.png");
              for (var i = 0; i < waypointsData.length; i++) {
                this.createMarker(waypointsData[i].location, waypointsData[i].name, '', waypointsData[i].mobile_no, "http://www.google.com/mapfiles/marker_yellow.png");
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

  call(number){

    let data = JSON.stringify({'caller_id':this.model.user_id,'callee_mobile_no':number  });
        $('#add_location_spinner').show();
          this.fetch.add_call_detail(data).subscribe(res => {
            this.callNumber.callNumber("08069010223", true)
            .then(res => { $('#add_location_spinner').show(); console.log('Launched dialer!', res); })
            .catch(err => console.log('Error launching dialer', err));
          });
  }
}



