import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
declare var google: any;
declare var Twilio: any;
declare var Cordova: any;
declare var $ : any;

@Component({
  selector: 'app-get-food-nearest-donors-two',
  templateUrl: './get-food-nearest-donors-two.page.html',
  styleUrls: ['./get-food-nearest-donors-two.page.scss'],
})
export class GetFoodNearestDonorsTwoPage implements OnInit {
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
	   var infowindow = new google.maps.InfoWindow();
	var renderer = new google.maps.DirectionsRenderer({
  suppressPolylines: true,
  infoWindow: infowindow,
});
	var food_id = this.route.snapshot.params['id'];
	var r_lat = this.route.snapshot.params['lat'];
	var r_lon = this.route.snapshot.params['lon'];
	this.model.r_id = this.route.snapshot.params['r_id'];
	this.model.d_food_type = this.route.snapshot.params['food_type'];
	if(this.model.d_food_type == 1 || this.model.d_food_type == 3){
		this.model.food_type = 'vegetarian';
	}else if(this.model.d_food_type == 2){
		this.model.food_type = 'Non-vegetarian';
	}
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	this.fetch.getKeyText(lang_code).subscribe(res => {
		let item1 = res.find(i => i.key_text === 'DONOR_NAME');
			this.model.key_text1 = item1[lang_code];
		let item2 = res.find(i => i.key_text === 'CANCEL_PICK_UP');
			this.model.key_text2 = item2[lang_code];
		let item3 = res.find(i => i.key_text === 'FOOD_PICKED_UP');
			this.model.key_text3 = item3[lang_code];
		let item4 = res.find(i => i.key_text === 'HOME');
			this.model.key_text4 = item4[lang_code];
		let item5 = res.find(i => i.key_text === 'ACTIVITY');
			this.model.key_text5 = item5[lang_code];
		let item6 = res.find(i => i.key_text === 'VOLUNTEER');
			this.model.key_text6 = item6[lang_code];
		
	});
	var mode = this.route.snapshot.params['mode'];
	this.fetch.get_donor_food_detail(food_id).subscribe(res => {
		console.log(res.data);
		this.model.colony_name = res.data.colony_name;
		this.model.city = res.data.city;
		this.model.state = res.data.state;
		this.model.country = res.data.country;
		this.model.postalCode = res.data.postalCode;
		this.model.total_food_for = res.data.total_food_for;
		this.model.username = res.data.username;
		this.model.latitude = res.data.latitude;
		this.model.longitude = res.data.longitude;
		this.model.donate_food_id = res.data.donate_food_id
		//console.log(this.model.food_data);
		this.geolocation.getCurrentPosition().then((resp) => {
		//console.log(res.data.latitude);
		//console.log(res.data.longitude);
		let latLng = new google.maps.LatLng(this.model.latitude, this.model.longitude);

		let mapOptions = {
			center: latLng,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
		
		let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;

        directionsDisplay.setMap(this.map);
        //directionsDisplay.setPanel(this.directionsPanel.nativeElement);

        directionsService.route({
            origin: r_lat+", "+r_lon,
            destination: this.model.latitude+", "+this.model.longitude,
            travelMode: google.maps.TravelMode[mode],
			provideRouteAlternatives: true,
        },(res, status) => {
            if(status == google.maps.DirectionsStatus.OK){
				console.log(res);
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
	});
	});
	//var self = this;
	document.addEventListener("deviceready", function() {
		/* self.fetch.twilio_token().subscribe(res => {
			self.model.token = res.data;
			alert(self.model.token);
			
		}); */
		alert('device ready');
		Twilio.TwilioVoiceClient.clientinitialized(function() {
			console.log('Ready to start call');
             $('#statusMessage').text('Ready to start call');
        });
       // Twilio.TwilioVoiceClient.initialize(token);
		Twilio.TwilioVoiceClient.callinvitereceived(function (call) {
				alert('twilio call');
                var confirmed = confirm('Accept incoming call from ' + call.from + '?');
                if (confirmed) {
                    Twilio.TwilioVoiceClient.acceptCallInvite();
                } else {
                    Twilio.TwilioVoiceClient.rejectCallInvite();
                }
            });
		
	}, false);  
	 
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
				
				  /* infowindow2.setContent(response.legs[0].duration.text);
				  var step = 6;
				  infowindow2.setPosition(response.legs[0].steps[step].end_location);
				  infowindow2.open(this.map); */
				google.maps.event.addListener(stepPolyline, 'click', function(evt) {
					console.log(response.legs[0].duration.text);
					infowindow.setContent(response.legs[0].duration.text);
					infowindow.setPosition(evt.latLng);
					infowindow.open(this.map);
				})
			}
		}
	}
  pickup_status(val){
	console.log(val);
	if(val == 1){
		let data = JSON.stringify({'receiver_id' : this.model.r_id, 'donor_id' : this.model.donate_food_id});
		this.fetch.pickup_food(data).subscribe(res => {
			console.log(res);
			if(res.success == true){
				localStorage.removeItem('receiver_food_type'); 
				localStorage.removeItem('set_confirm_location_route'); 
				localStorage.removeItem('receiver_location'); 
				this.router.navigate(['/feedback-form',res.data]);
			}
		});
	}else{
		localStorage.removeItem('receiver_food_type'); 
		localStorage.removeItem('set_confirm_location_route'); 
		localStorage.removeItem('receiver_location'); 
		this.router.navigate(['/home']);
	}
  }
  call(){
	 var self = this;
	document.addEventListener("deviceready", function() {
		self.fetch.twilio_token().subscribe(res => {
			self.model.token = res.data;
			alert(self.model.token);
			Twilio.TwilioVoiceClient.clientinitialized(function() {
			console.log('Ready to start call');
				$('#statusMessage').text('Ready to start call');
			});
			var params = { "tocall" : '8770782264'};
			Twilio.TwilioVoiceClient.call(self.model.token, params);
			/* Twilio.Connection.call = function(token, params) {
			Cordova.exec(null,null,"TwilioVoicePlugin","call",[token, params]);
		} */
			/*Twilio.Device.connect(function(connection) {
				alert(connection.status());
			})*/
		});
	}, false);
  }

}
