import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service'; 
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
declare var google: any;
declare var $: any;
@Component({
  selector: 'app-display-accept-request-on-map',
  templateUrl: './display-accept-request-on-map.page.html',
  styleUrls: ['./display-accept-request-on-map.page.scss'],
})
export class DisplayAcceptRequestOnMapPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  model:any={};
  map: any;
  start : any;
  end : any;
  time_c : any;
  distance_c:any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directions = [];
  polylines = [];
  id: any;
  id2: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fetch: FetchService,
    private storage: StorageService,
    private geolocation: Geolocation,
  ) { }

  ngOnInit() {
  }
	ionViewWillEnter(){
    this.model.is_volunteer = 0;
    if(localStorage.getItem('volunteer_approve') != null){
      this.model.is_volunteer = localStorage.getItem('volunteer_approve');
    }  
    var lang_code = JSON.parse(localStorage.getItem('lang'));
    //this.fetch.getKeyText(lang_code).subscribe(res => {
      let res = this.storage.getScope();
      let item1 = res.find(i => i.key_text === 'REJECT');
        this.model.key_text1 = item1[lang_code];
      let item2 = res.find(i => i.key_text === 'HOME');
        this.model.key_text2 = item2[lang_code];
      let item3 = res.find(i => i.key_text === 'ACTIVITY');
        this.model.key_text3 = item3[lang_code];
      let item4 = res.find(i => i.key_text === 'VOLUNTEER');
        this.model.key_text4 = item4[lang_code];
      let item5 = res.find(i => i.key_text === 'ACCEPT');
        this.model.key_text5 = item5[lang_code];
    //});
    var data = this.route.snapshot.params['data'];
    this.id = this.route.snapshot.params['id'];
    this.id2 = this.route.snapshot.params['id2'];
    
    var x = JSON.parse(data);
    var donor = (x.donor_details);
    console.log(this.id,'',this.id2);
    console.log('volunteer',x);
    var no_of_person = x.no_of_person;
    localStorage.setItem('temp_total_food',no_of_person);
    var r_lat = x.latitude;
    var r_lon = x.longitude;
    this.model.r_id = x.app_user_id;
    this.model.f_id = x.id;
    this.model.r_lat = r_lat;
    this.model.r_lon = r_lon;
    this.model.food_id = donor.id;
    
    this.model.colony_name = donor.colony_name;
    this.model.add_id = donor.id;
    
    this.model.d_lat = donor.latitude;
    this.model.d_lon = donor.longitude;
    this.model.d_food_type = donor.food_type;
    if(x.time_distance_walking.rows[0].elements[0].status == 'OK'){
      this.model.walk_time = x.time_distance_walking.rows[0].elements[0].duration.text;
      this.model.walk_distance = x.time_distance_walking.rows[0].elements[0].distance.text;
    }else{
      this.model.walk_time = 0;	
      this.model.walk_distance = 0;	
    }
    if(x.time_distance_driving.rows[0].elements[0].status == 'OK'){
      this.model.drive_time = x.time_distance_driving.rows[0].elements[0].duration.text;
      this.model.drive_distance = x.time_distance_driving.rows[0].elements[0].distance.text;
    }else{
      this.model.drive_time = 0;
      this.model.drive_distance = 0;
    }
    if(x.time_distance_transit.rows[0].elements[0].status=='OK'){
      this.model.public_time = x.time_distance_transit.rows[0].elements[0].duration.text;
      this.model.public_distance = x.time_distance_transit.rows[0].elements[0].distance.text;
    }else{
      this.model.public_time = 0;	
      this.model.public_distance = 0;	
    }
    
    this.geolocation.getCurrentPosition().then((resp) => {
      
      let latLng = new google.maps.LatLng(donor.latitude, donor.longitude);
  
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
  
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.model.directionsService = new google.maps.DirectionsService();
         this.model.directionsDisplay = new google.maps.DirectionsRenderer();
      this.model.directionsDisplay.setMap(this.map);
          //directionsDisplay.setPanel(this.directionsPanel.nativeElement);
      
      this.calculate_route('WALKING');
      
          $("#btn_walk").addClass('active');
          $("#text_walk_time").removeClass('grey');
          $("#text_walk_time").css('color','white');
      this.model.walk_image = 'icon_donor_walk_white.svg';
      this.model.mode = 'WALKING';
    }); 
    }
    calculate_route(mode){
	  
    var infowindow = new google.maps.InfoWindow();
    var renderer = new google.maps.DirectionsRenderer({
    suppressPolylines: true,
    infoWindow: infowindow,
  });
    if (this.directions && this.directions.length > 0) {
      for (var i = 0; i < this.directions.length; i++)
        this.directions[i].setMap(null);
      }
      this.directions = [];
          this.model.directionsDisplay.setMap(null);
          this.model.directionsDisplay.setDirections({routes: []});
      this.model.directionsDisplay.setMap(this.map);
      
      this.model.mode = mode;
      if(mode == 'WALKING'){
        this.time_c = this.model.walk_time;	
        this.distance_c = this.model.walk_distance;
        $("#btn_walk").addClass('active');
        $("#btn_drive").removeClass('active');
        $("#btn_bus").removeClass('active');
        $("#text_walk_time").removeClass('grey');
        $("#text_bus_time").addClass('grey');
        $("#text_bike_time").addClass('grey');
        $("#text_walk_time").css('color','white');
        this.model.walk_image = 'icon_donor_walk_white.svg';
        this.model.bus_image = 'icon_donor_bus.svg';
        this.model.bike_image = 'icon_donor_bike.svg';
      }else if(mode == 'TRANSIT'){
        this.time_c = this.model.public_time;	
        this.distance_c = this.model.public_distance;
        $("#btn_bus").addClass('active');
        $("#btn_drive").removeClass('active');
        $("#btn_walk").removeClass('active');
        $("#text_bus_time").removeClass('grey');
        $("#text_walk_time").addClass('grey');
        $("#text_bike_time").addClass('grey');
        $("#text_bus_time").css('color','white');
        this.model.bus_image = 'icon_donor_bus_white.svg';
        this.model.walk_image = 'icon_donor_walk.svg';
        this.model.bike_image = 'icon_donor_bike.svg';
      }else if(mode == 'DRIVING'){
        this.time_c = this.model.drive_time;	
        this.distance_c = this.model.drive_distance;
        $("#btn_drive").addClass('active');
        $("#btn_bus").removeClass('active');
        $("#btn_walk").removeClass('active');
        $("#text_bike_time").removeClass('grey');
        $("#text_walk_time").addClass('grey');
        $("#text_bus_time").addClass('grey');
        $("#text_bike_time").css('color','white');
        this.model.bike_image = 'icon_donor_bike_white.svg';
        this.model.walk_image = 'icon_donor_walk.svg';
        this.model.bus_image = 'icon_donor_bus.svg';
      }
      /*const s_latlng = {
        lat : 23.1827,
        lng : 75.7682
      }*/
      this.model.directionsService.route({
              origin: this.model.r_lat+", "+this.model.r_lon,
              destination: this.model.d_lat+", "+this.model.d_lon,
              travelMode: google.maps.TravelMode[mode],
        provideRouteAlternatives: true,
          },(res, status) => {
              if(status == google.maps.DirectionsStatus.OK){
          renderer.setDirections(res);
          renderer.setMap(this.map);
           for (var i=0; i<this.polylines.length; i++) {
            this.polylines[i].setMap(null);
            }
          for(var i = 0; i < res.routes.length; i++){
            var fastest = Number.MAX_VALUE,
                      shortest = Number.MAX_VALUE;
                  res.routes.forEach(function(rou, index) {
            console.log("distance of route " +index+": " , rou.legs[0].distance.value);
            console.log("duration of route " +index+": " , rou.legs[0].duration.value);
            if (rou.legs[0].distance.value < shortest) shortest = rou.legs[0].distance.value  ;
            if (rou.legs[0].duration.value < fastest) fastest = rou.legs[0].duration.value  ;
                  })
            var polylineOptions = {
              strokeColor: res.routes[i].legs[0].duration.value == fastest? "#22A7F0":res.routes[i].legs[0].distance.value == shortest?"#585858":"#585858",
              strokeOpacity: res.routes[i].legs[0].duration.value == fastest? 0.8:res.routes[i].legs[0].distance.value == shortest? 0.9: 0.5,
              strokeWeight: res.routes[i].legs[0].duration.value == fastest? 9:res.routes[i].legs[0].distance.value == shortest? 8: 3,
            };
            this.renderDirectionsPolylines(res.routes[i], polylineOptions);
          }
          
              } else {
                  console.warn(status);
              }
          });
    }
    renderDirectionsPolylines(response, polylineOptions) {
      console.log(response);
      var infowindow = new google.maps.InfoWindow();
      var legs = response.legs;
      for (var i = 0; i < legs.length; i++) {
        var steps = legs[i].steps;
        for (var j = 0; j < steps.length; j++) {
          var nextSegment = steps[j].path;
          var stepPolyline = new google.maps.Polyline(polylineOptions);
          for (var k = 0; k < nextSegment.length; k++) {
            stepPolyline.getPath().push(nextSegment[k]);
          }
          this.polylines.push(stepPolyline);
          stepPolyline.setMap(this.map);
          // route click listeners, different one on each step
          google.maps.event.addListener(stepPolyline, 'click', function(evt) {
            //stepPolyline.setOptions({strokeColor: '#FF0000'});
            console.log(response.legs[0].duration.text);
            infowindow.setContent(response.legs[0].duration.text);
            infowindow.setPosition(evt.latLng);
            infowindow.open(this.map);
          })
        }
      }
    }

    rejectRequest(){
      var formData: any = new FormData();
      formData.append("receiver_id", this.model.r_id);
      formData.append("get_food_id", this.model.f_id);
      this.fetch.reject_food_request_by_donee(formData).subscribe(res => {
      });
      this.router.navigate(['/choose-screen-after-reject',this.model.food_id,this.model.r_id,this.model.f_id])
    }
    acceptRequest(){
      var formData: any = new FormData();
      formData.append("receiver_id", this.model.r_id);
      formData.append("food_id", this.model.food_id);
      formData.append("no_of_people", localStorage.getItem('temp_total_food'));
      this.fetch.donee_accept_food(formData).subscribe(res => {
        this.router.navigate(['/get-food-nearest-donors-two',this.model.add_id,this.model.r_lat,this.model.r_lon,this.model.r_id,this.model.mode,this.model.d_food_type,this.model.f_id]);
        
      });
    }
}
