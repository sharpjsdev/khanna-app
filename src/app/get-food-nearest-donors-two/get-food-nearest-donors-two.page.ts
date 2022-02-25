import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { AlertController , Platform } from '@ionic/angular';
import { NotificationPage } from '../modal/notification/notification.page';
import { CancelAllotedfoodPage } from '../modal/cancel-allotedfood/cancel-allotedfood.page';
import { SuccessDeliverModalPage } from '../modal/success-deliver-modal/success-deliver-modal.page';
import { ModalController } from '@ionic/angular';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { environment } from '../../environments/environment';
declare var google: any;
declare var Cordova: any;
declare var cordova: any;
declare var $ : any;

@Component({
  selector: 'app-get-food-nearest-donors-two',
  templateUrl: './get-food-nearest-donors-two.page.html',
  styleUrls: ['./get-food-nearest-donors-two.page.scss'],
  providers : [CallNumber],
})
export class GetFoodNearestDonorsTwoPage implements OnInit {
@ViewChild('map') mapElement: ElementRef;
model:any={};
map: any;
start : any;
end : any;
notification:any=[];
dataReturned: any;
directionsService = new google.maps.DirectionsService;
directionsDisplay = new google.maps.DirectionsRenderer;
directions = [];
polylines = [];
l1 : any;
l2 : any ;
  constructor(
	public modalController: ModalController,
	private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
	private storage : StorageService,
	private geolocation: Geolocation,
	private alertCtrl: AlertController,
	private browserTab: BrowserTab,
	private callNumber: CallNumber,
	private platform : Platform
  ) { }

  ngOnInit() {
  }
  

  ionViewWillEnter(){
	$("#map_location_spinner").show();
	this.model.is_volunteer = 0;
	if(localStorage.getItem('volunteer_approve') != null){
		this.model.is_volunteer = localStorage.getItem('volunteer_approve');
	}
	   var infowindow = new google.maps.InfoWindow();
	var renderer = new google.maps.DirectionsRenderer({
  suppressPolylines: true,
  infoWindow: infowindow,
});
this.model.latitude = '';
this.model.longitude = '';
this.model.user_id = JSON.parse(localStorage.getItem('user_id'));
	var food_id = this.route.snapshot.params['id'];
	
	var r_lat = this.route.snapshot.params['lat'];
	var r_lon = this.route.snapshot.params['lon'];
	this.model.r_id = this.route.snapshot.params['r_id'];
	this.model.d_food_type = this.route.snapshot.params['food_type'];
	this.model.getfood_id = this.route.snapshot.params['getfoodid'];
	if(this.model.d_food_type == 1 || this.model.d_food_type == 3){
		this.model.food_type = 'Veg.';
	}else if(this.model.d_food_type == 2){
		this.model.food_type = 'Non-Veg.';
	}
	this.l1 = r_lat;
	this.l2 = r_lon;
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	//this.fetch.getKeyText(lang_code).subscribe(res => {
		let res = this.storage.getScope();
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
		let item7 = res.find(i => i.key_text === 'CANCEL_FOOD_REQUEST');
			this.model.key_text7 = item7[lang_code];
		let item8 = res.find(i => i.key_text === 'WANT_FOOD');
			this.model.key_text8 = item8[lang_code]; 			
		let item9 = res.find(i => i.key_text === 'DONT_WANT_FOOD');
			this.model.key_text9 = item9[lang_code]; 			
		let item10 = res.find(i => i.key_text === 'CANCEL_DROP');
			this.model.key_text10 = item10[lang_code];
		let item11 = res.find(i => i.key_text === 'FOOD_DROPPED');
			this.model.key_text11 = item11[lang_code];
		let item12 = res.find(i => i.key_text === 'SHOP_NAME1');
			this.model.key_text12 = item12[lang_code];
		let item13 = res.find(i => i.key_text === 'FOOD');
			this.model.key_text13 = item13[lang_code];
		let item14 = res.find(i => i.key_text === 'REQUESTED_FOR');
			this.model.key_text14 = item14[lang_code];
		let item15 = res.find(i => i.key_text === 'PERSON');
			this.model.key_text15 = item15[lang_code];
		let item16 = res.find(i => i.key_text === 'DIRECTION');
			this.model.key_text16 = item16[lang_code];
		let item17 = res.find(i => i.key_text === 'CALL');
        this.model.key_text17 = item17[lang_code];
		
	//});
	var mode = this.route.snapshot.params['mode'];
	this.fetch.get_volunteer_detail(this.model.getfood_id).subscribe(res => {
		console.log(res.data);
		this.model.colony_name = res.data.colony_name;
		this.model.city = res.data.city;
		this.model.state = res.data.state;
		this.model.country = res.data.country;
		this.model.postalCode = res.data.postalCode;
		var no_of_person = localStorage.getItem('temp_total_food');
		this.model.total_food_for = no_of_person;
		this.model.username = res.data.username;
		//this.model.latitude = res.data.latitude;
		//this.model.longitude = res.data.longitude;
		this.model.donate_food_id = res.data.donate_food_id
		//console.log(this.model.food_data);
		this.model.donar_id = res.data.donor_id;
		this.model.shop_name = res.data.shop_stall_name;
		
		let donar = JSON.stringify({'id': res.data.app_user_id});
      this.fetch.profile(donar).subscribe(res => {
		
        this.model.mobile_number = res['mobile_no'];
        
	  });
	  let receiver = JSON.stringify({'id': this.model.user_id});
	  this.fetch.profile(receiver).subscribe(res => {
		
        this.model.loged_in_user = res['username'];
        
      });
	  this.fetch.get_donate_food(food_id).subscribe(f_d => {
		if(f_d['success'] == true){
			this.model.latitude = f_d.data.don_lat;
			this.model.longitude = f_d.data.don_lng;
			console.log('my',this.model.latitude);
			console.log('my',this.model.longitude);
			if(this.model.latitude!='' && this.model.longitude!=''){
				$("#map_location_spinner").hide();
				console.log('receiver lat'+r_lat);
				console.log('receiver lat'+r_lon);
				console.log('donor lat'+this.model.latitude);
				console.log('donor long'+this.model.longitude);
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
			   }
		}
	})
	
	  
	 


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
	//console.log(val);
	if(val == 1){ 
		
		
		let data = JSON.stringify({'receiver_id' : this.model.r_id, 'donor_id' : this.model.donar_id, 'getFood_id' : this.model.getfood_id});
	
		this.fetch.pickup_food(data).subscribe(res => {
			//console.log(res);
			if(res.success == true){
				localStorage.removeItem('receiver_food_type'); 
				localStorage.removeItem('set_confirm_location_route'); 
				localStorage.removeItem('receiver_location'); 
				localStorage.removeItem('food_for_no_of_person'); 
				this.pickupRequestSuccessModal(res.data,this.model.getfood_id);
				//this.router.navigate(['/feedback-form',res.data,this.model.getfood_id]);
			}
		});
	}else{
		// this.presentConfirm();
		this.cancelAllotedRequest(this.model.getfood_id);
		/* localStorage.removeItem('receiver_food_type'); 
		localStorage.removeItem('set_confirm_location_route'); 
		localStorage.removeItem('receiver_location'); 
		localStorage.removeItem('food_for_no_of_person'); 
		this.router.navigate(['/home']); */
	}
  }
 call(){
	
		let data = JSON.stringify({'caller_id':this.model.user_id,'callee_mobile_no':this.model.mobile_number  });
			$('#add_location_spinner').show();
				this.fetch.add_call_detail(data).subscribe(res => {
					this.callNumber.callNumber(environment.phone_no, true)
					.then(res => { $('#add_location_spinner').show(); console.log('Launched dialer!', res); })
					.catch(err => console.log('Error launching dialer', err));
				});
 }

 async cancelAllotedRequest(id) {
    const modal = await this.modalController.create({
		component: CancelAllotedfoodPage,
		cssClass: 'custom_filter_modal cancel_allot_food_popup',
		componentProps: {
			"paramID": 123,
			"paramTitle": "Test Title",
			"id" : id,
			"type" : 'donate_food'
		}
    });

    modal.onDidDismiss().then((dataReturned) => {
		
		if (dataReturned !== null) {
			this.dataReturned = dataReturned.data;
			if(this.dataReturned == 1){
				// this.ngOnInit();
				this.model.user_id = JSON.parse(localStorage.getItem('user_id'));
				var no_of_person = localStorage.getItem('temp_total_food');
				var food_id = this.route.snapshot.params['id'];
				let data = JSON.stringify({'food_id':food_id,'logged_in_user':this.model.loged_in_user, 'no_of_person':no_of_person, 'app_user_id' : this.model.user_id, 'food_type' : this.model.d_food_type, 'notification_type' : 3, 'to' : this.model.donar_id, 'from' : this.model.user_id, 'getFoodId' : this.model.getfood_id  });
			//console.log(data);
				this.fetch.notify_donar_donate(data).subscribe(res => {
						this.router.navigate(['/home']);
				});
				
			}

			//alert('Modal Sent Data :'+ dataReturned);
		}
    });

    return await modal.present();
  }

  async pickupRequestSuccessModal(data,id) {
	  
    const modal = await this.modalController.create({
		component: SuccessDeliverModalPage,
		cssClass: 'custom_filter_modal cancel_allot_food_popup',
		componentProps: {
			"paramID": 123,
			"paramTitle": "Test Title",
			"id" : id,
			"data" : data
		}
    });

    modal.onDidDismiss().then((dataReturned) => {
		
		if (dataReturned !== null) {
			//alert('Modal Sent Data :'+ dataReturned);
		}
    });

    return await modal.present();
  }


 async presentConfirm() {
  const alert = await this.alertCtrl.create({
	cssClass: 'my-custom-class',
    header: this.model.key_text7,
    buttons: [
      {
        text: this.model.key_text9,
        handler: () => { 
			this.model.user_id = JSON.parse(localStorage.getItem('user_id'));
			var no_of_person = localStorage.getItem('temp_total_food');
			var food_id = this.route.snapshot.params['id'];
			let data = JSON.stringify({'food_id':food_id,'logged_in_user':this.model.loged_in_user, 'no_of_person':no_of_person, 'app_user_id' : this.model.user_id, 'food_type' : this.model.d_food_type, 'notification_type' : 3, 'to' : this.model.donar_id, 'from' : this.model.user_id, 'getFoodId' : this.model.getfood_id  });
			//console.log(data);
			this.fetch.notify_donar(data).subscribe(res => {
				this.router.navigate(['/home']);
		});
        }
      },
      {
        text: this.model.key_text8,
        handler: () => {
			//localStorage.removeItem('receiver_food_type'); 
			//localStorage.removeItem('set_confirm_location_route'); 
			//localStorage.removeItem('receiver_location'); 
			//localStorage.removeItem('food_for_no_of_person'); 
			//this.router.navigate(['/home']);
        }
      }
    ]
  });
  await alert.present();
}
openMap(){
	let destination = this.l1 + ',' + this.l2;
	//window.open('maps://?q=' + destination, '_system');
	if(this.platform.is('ios')){
		window.open('maps://?q=' + destination, '_system');
	} else {
		let label = encodeURI('My Label');
		window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
	}
  }
}
