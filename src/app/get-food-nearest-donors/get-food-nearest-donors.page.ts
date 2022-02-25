import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service'; 
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { NotificationPage } from '../modal/notification/notification.page';
import { ModalController } from '@ionic/angular';
import { RejectGetFoodRequestPage } from '../modal/reject-get-food-request/reject-get-food-request.page';
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
time_c : any;
distance_c:any;
dataReturned: any;
directionsService = new google.maps.DirectionsService;
directionsDisplay = new google.maps.DirectionsRenderer;
directions = [];
polylines = [];
no_of_person: any;
additional_msg_1 : any = "";
additional_msg_2 : any = "";
  constructor(
	public modalController: ModalController,
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
	this.model.user_id = localStorage.getItem('user_id');
	this.no_of_person = localStorage.getItem('number_of_person')
	if(localStorage.getItem('volunteer_approve') != null){
		this.model.is_volunteer = localStorage.getItem('volunteer_approve');
	}  
	this.fetch.get_registered_user_data(this.model.user_id).subscribe(res => {
		//console.log(res);
		this.model.username_r = res['username']; 
	});
		
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
		let item6 = res.find(i => i.key_text === 'DEAR');
			this.model.key_text6 = item6[lang_code];
		let item7 = res.find(i => i.key_text === 'GET_FOOD_MSG_1');
			this.model.key_text7 = item7[lang_code];
		let item8 = res.find(i => i.key_text === 'PEOPLE');
			this.model.key_text8 = item8[lang_code];
		let item9 = res.find(i => i.key_text === 'IN');
			this.model.key_text9 = item9[lang_code];
		let item10 = res.find(i => i.key_text === 'GET_FOOD_MSG_2');
			this.model.key_text10 = item10[lang_code];
		let item11 = res.find(i => i.key_text === 'GET_FOOD_MSG_3');
			this.model.key_text11 = item11[lang_code];
		
		let item12 = res.find(i => i.key_text === 'VEG');
			this.model.key_text12 = item12[lang_code];
		let item13 = res.find(i => i.key_text === 'NON_VEG');
			this.model.key_text13 = item13[lang_code];
		let item14 = res.find(i => i.key_text === 'FOOD');
			this.model.key_text14 = item14[lang_code];
		let item15 = res.find(i => i.key_text === 'GET_FOOD_MSG_4');
			this.model.key_text15 = item15[lang_code];
		let item16 = res.find(i => i.key_text === 'GET_FOOD_MSG_5');
			this.model.key_text16 = item16[lang_code];
	//});
	var data = this.route.snapshot.params['data'];
	var data2 = this.route.snapshot.params['data2'];
	var r_lat = this.route.snapshot.params['r_lat'];
	var r_lon = this.route.snapshot.params['r_lon'];
	this.model.r_id = this.route.snapshot.params['r_id'];
	this.model.getFood_id = this.route.snapshot.params['id']; 
	this.model.type_id = this.route.snapshot.params['t']; 
	this.model.r_lat = r_lat;
	this.model.r_lon = r_lon;
	var x = JSON.parse(data);
	var rdata = JSON.parse(data2);
	this.model.rdata = rdata;
	this.model.total_data = x;
	this.model.colony_name = x.data.colony_name;
	this.model.add_id = x.data.id;
	this.model.d_lat = x.data.latitude;
	this.model.d_lon = x.data.longitude;
	this.model.d_food_type = x.data.food_type;
	this.model.no_of_food = x.data.total_food_for;
	if(this.model.d_food_type == 1){
		this.model.food_name = this.model.key_text12+' '+this.model.key_text14;
	}if(this.model.d_food_type == 2){
		this.model.food_name = this.model.key_text13+' '+this.model.key_text14;;
	}if(this.model.d_food_type == 3){
		this.model.food_name = this.model.key_text12+'/'+ this.model.key_text13+' '+this.model.key_text14;;
	}
	if(x.data.time_distance_walking.rows[0].elements[0].status == 'OK'){
		this.model.walk_time = x.data.time_distance_walking.rows[0].elements[0].duration.text;
		this.model.walk_distance = x.data.time_distance_walking.rows[0].elements[0].distance.text;
	}else{
		this.model.walk_time = 0;
		this.model.walk_distance = 0;	
	}
	if(x.data.time_distance_driving.rows[0].elements[0].status == 'OK'){
		this.model.drive_time = x.data.time_distance_driving.rows[0].elements[0].duration.text;
		this.model.drive_distance = x.data.time_distance_driving.rows[0].elements[0].distance.text;
	}else{
		this.model.drive_time = 0;
		this.model.drive_distance = 0;
	}
	if(x.data.time_distance_transit.rows[0].elements[0].status=='OK'){
		this.model.public_time = x.data.time_distance_transit.rows[0].elements[0].duration.text;
		this.model.public_distance = x.data.time_distance_transit.rows[0].elements[0].distance.text;
	}else{
		this.model.public_time = 0;	
		this.model.public_distance = 0;	
	}
	
	this.geolocation.getCurrentPosition().then((resp) => {
		
		let latLng = new google.maps.LatLng(x.data.latitude, x.data.longitude);

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
	if(this.no_of_person > this.model.total_data.data.total_food_for){
		//this.additional_msg_1 = this.model.key_text16;
		this.additional_msg_2 = this.model.key_text15;
		this.model.number_of_person =this.model.total_data.data.total_food_for;
	  }
	  else if(this.no_of_person <= this.model.total_data.data.total_food_for){
		this.additional_msg_1 = "";
		this.additional_msg_2 = "";
		this.model.number_of_person = this.no_of_person;
	  }
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
	async openRejectModel() {
		const modal = await this.modalController.create({
		component: RejectGetFoodRequestPage,
		cssClass: 'custom_current_location_modal notification-modal',
		backdropDismiss : false,
		componentProps: {
			"data" : this.model.total_data,
			"r_data" : this.model.rdata,
			"app_id" : this.model.r_id,
			"type_id" : this.model.type_id
		}
		});  
		modal.onDidDismiss().then((dataReturned) => {
		
		});
	
		return await modal.present();
	  } 
	rejectRequest(){
		this.openRejectModel();
	}
	acceptRequest(){
		
		this.model.search = true;
		this.model.user_id = JSON.parse(localStorage.getItem('user_id'));
		let data;
		if(this.no_of_person > this.model.total_data.data.total_food_for){
		  this.model.number_of_person =this.model.total_data.data.total_food_for;
		}
		else if(this.no_of_person <= this.model.total_data.data.total_food_for){
		  this.model.number_of_person = this.no_of_person;
		}
		data = JSON.stringify({'app_user_id' : this.model.user_id,'donar_id':this.model.total_data.data.app_user_id,'donate_food_id':this.model.total_data.data.id,  'food_type' : this.model.total_data.data.food_type, 'no_of_person' : this.model.number_of_person, 'latitude' : this.model.total_data.data.latitude, 'longitude' : this.model.total_data.data.longitude, 'colony_name' : this.model.total_data.data.colony_name, 'city' : this.model.total_data.data.city, 'state' : this.model.total_data.data.state, 'country' : this.model.total_data.data.country, 'postal_code' : this.model.total_data.data.postalCode, 'notification_type' : 1});
		localStorage.setItem('temp_total_food',this.model.number_of_person);
			this.fetch.accept_food(data).subscribe(res => {
		  if(res.success == true){
		  this.model.search = false;
		  localStorage.setItem('res.receiver_food_id',res.receiver_food_id);
		  this.router.navigate(['/get-food-nearest-donors-two-duplicate',this.model.add_id,this.model.r_lat,this.model.r_lon,this.model.r_id,this.model.mode,this.model.d_food_type,res.receiver_food_id]);
		  }
		}); 
	}
}
