import { Component, OnInit, ViewChild ,ElementRef,NgZone } from '@angular/core';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Platform,ModalController } from '@ionic/angular';
import { Location } from "@angular/common";

declare var google: any;
declare var $: any;

@Component({
  selector: 'app-show-in-between',
  templateUrl: './show-in-between.page.html',
  styleUrls: ['./show-in-between.page.scss'],
})
export class ShowInBetweenPage implements OnInit {
  sources;
  destination;
  autocomplete:any={};

  latitude: number = 0;
  longitude: number = 0;
  geo: any;
  service = new google.maps.places.AutocompleteService();
  model:any={};
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true
  });
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
  public modal : ModalController
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

        self.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        self.directionsRenderer.setMap(self.map);
       
        
      }); 
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
 showRoutes(){
   if(this.autocomplete.start != '' && this.autocomplete.end != ''){
     let data = JSON.stringify({startLat:this.model.startLat,startLng:this.model.startLng,endLat:this.model.endLat,endLng:this.model.endLng,city:this.model.city});
     this.fetch.get_waypoints(data).subscribe(res => {
        let waypts = [];
        res.data.forEach((val,i)=>{
          waypts.push({
            location: new google.maps.LatLng(val.latitude,val.longitude),
            stopover: true
          });
        });
        console.log(waypts);
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
              this.createMarker(endLocation, "end", "special text for end marker", "http://www.google.com/mapfiles/markerB.png")
              this.createMarker(startLocation, "start", "special text for start marker", "http://maps.gstatic.com/mapfiles/markers2/marker_greenA.png");
              for (var i = 0; i < waypts.length; i++) {
                this.createMarker(waypts[i].location, "waypoint " + i, "special text for waypoint marker " + i, "http://www.google.com/mapfiles/marker_yellow.png");
              }
            
            } else {
              window.alert("Directions request failed due to " + status);
            }
          }
        );
		});
    
     
          
    }  
 }
 createMarker(latlng, label, html, url) {
  var contentString = '<b>' + label + '</b><br>' + html;
  var marker = new google.maps.Marker({
    position: latlng,
    map: this.map,
    icon: {url : url },
    title: label,
    zIndex: Math.round(latlng.lat() * -100000) << 5
  });

  google.maps.event.addListener(marker, 'click', ()=> {
    this.infowindow.setContent(contentString);
    this.infowindow.open(this.map, marker);
  });

  
}
}



