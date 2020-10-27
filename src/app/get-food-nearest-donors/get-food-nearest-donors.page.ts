import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
declare var google: any;
declare var $: any;

@Component({
  selector: 'app-get-food-nearest-donors',
  templateUrl: './get-food-nearest-donors.page.html',
  styleUrls: ['./get-food-nearest-donors.page.scss'],
})
export class GetFoodNearestDonorsPage implements OnInit {
@ViewChild('map') mapElement: ElementRef;
model:any={};
map: any;
start : any;
end : any;

directionsService = new google.maps.DirectionsService;
directionsDisplay = new google.maps.DirectionsRenderer;
directions = [];
polylines = [];
  constructor(
	private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
	private geolocation: Geolocation,
  ) { }

  ngOnInit() {
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	this.fetch.getKeyText(lang_code).subscribe(res => {
		let item1 = res.find(i => i.key_text === 'PROCEED');
			this.model.key_text1 = item1[lang_code];
		let item2 = res.find(i => i.key_text === 'HOME');
			this.model.key_text2 = item2[lang_code];
		let item3 = res.find(i => i.key_text === 'ACTIVITY');
			this.model.key_text3 = item3[lang_code];
		let item4 = res.find(i => i.key_text === 'VOLUNTEER');
			this.model.key_text4 = item4[lang_code];
	});
	var data = this.route.snapshot.params['data'];
	var r_lat = this.route.snapshot.params['r_lat'];
	var r_lon = this.route.snapshot.params['r_lon'];
	this.model.r_id = this.route.snapshot.params['r_id'];
	this.model.r_lat = r_lat;
	this.model.r_lon = r_lon;
	var x = JSON.parse(data);
	this.model.donor_address = x;
	console.log(x);
	this.model.d_lat = x.latitude;
	this.model.d_lon = x.longitude;
	this.model.d_food_type = x.food_type;
	this.model.walk_time = x.time_distance_walking.rows[0].elements[0].duration.text;
	this.model.drive_time = x.time_distance_driving.rows[0].elements[0].duration.text;
	this.model.public_time = x.time_distance_transit.rows[0].elements[0].duration.text;
	
	this.geolocation.getCurrentPosition().then((resp) => {
		console.log(x.latitude);
		console.log(x.longitude);
		let latLng = new google.maps.LatLng(x.latitude, x.longitude);

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
				/* var infowindow2 = new google.maps.InfoWindow();
				  infowindow2.setContent(response.legs[0].duration.text);
				  var step = 6;
				  infowindow2.setPosition(response.legs[0].steps[step].end_location);
				  console.log(response.legs[0]);
				  infowindow2.open(this.map); */
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
 
  
}
