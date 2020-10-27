import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CurrentLocationContentPage } from '../modal/current-location-content/current-location-content.page';
import { LocationErrorContentPage } from '../modal/location-error-content/location-error-content.page';
import { HomeContentPage } from '../modal/home-content/home-content.page';
import { Platform } from '@ionic/angular';
import { Location } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';

declare var $:any;

@Component({
  selector: 'app-register-volunteer',
  templateUrl: './register-volunteer.page.html',
  styleUrls: ['./register-volunteer.page.scss'],
})
export class RegisterVolunteerPage implements OnInit {
  dataReturned: any;
  model:any={};
	location_data:any=[];
	volunteer_data:any=[];
  constructor(
	public modalController: ModalController,
	private platform: Platform,
	private location: Location,
	private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
	public alertController: AlertController,
  ) {
	this.platform.backButton.subscribeWithPriority(10, () => {
		this.location.back();
	});
	  }

  ngOnInit() {
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	this.fetch.getKeyText(lang_code).subscribe(res => {
		let item1 = res.find(i => i.key_text === 'KHANAA_APP');
			this.model.key_text1 = item1[lang_code];
		let item2 = res.find(i => i.key_text === 'VOLUNTEER_TAG');
			this.model.key_text2 = item2[lang_code];
		let item3 = res.find(i => i.key_text === 'DATE_OF_BIRTH');
			this.model.key_text3 = item3[lang_code];
		let item4 = res.find(i => i.key_text === 'USERNAME');
			this.model.key_text4 = item4[lang_code];
		let item5 = res.find(i => i.key_text === 'SET_LOCATION');
			this.model.key_text5 = item5[lang_code];
		let item6 = res.find(i => i.key_text === 'REGISTER');
			this.model.key_text6 = item6[lang_code];
			
	});
	console.log(this.location_data);
	this.model.volunteer_id = '';
	var user_id = JSON.parse(localStorage.getItem('user_registerd'));
	this.fetch.v_check(user_id).subscribe(res => {
		//alert(res.data);
		console.log(res.data);
		if(res.success == true){
			this.model.volunteer_id = res.data;
			this.fetch.v_edit(this.model.volunteer_id).subscribe(res => {
				console.log(res.data);
				this.volunteer_data = res.data;
			});
		}else{
			this.model.volunteer_id = JSON.parse(localStorage.getItem('volunteer_id'));
			if(this.model.volunteer_id != null){
				this.fetch.v_edit(this.model.volunteer_id).subscribe(res => {
					console.log(res.data);
					this.volunteer_data = res.data;
				});
			}
		}
	});
  }
  async openModalCurrentLocation() {
	localStorage.setItem('set_confirm_location_route', JSON.stringify('register-volunteer'));	  
    const modal = await this.modalController.create({
      component: CurrentLocationContentPage,
      cssClass: 'custom_current_location_modal',
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    }); 

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
		this.location_data = JSON.parse(this.dataReturned);
		this.volunteer_data.latitude = this.location_data.latitude;
		 this.volunteer_data.longitude = this.location_data.longitude;
		 this.volunteer_data.colony_name = this.location_data.colony_name;
		 this.volunteer_data.city = this.location_data.city;
		 this.volunteer_data.state = this.location_data.state;
		 this.volunteer_data.country = this.location_data.country;
		 this.volunteer_data.postalCode = this.location_data.postalCode;
      }
    });

    return await modal.present();
  }

  async successFullRegistration() { 
    const modal = await this.modalController.create({
      component: HomeContentPage,
      cssClass: 'home_content_modal',
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    }); 

    modal.onDidDismiss().then((dataReturned) => {
		this.router.navigate(['/home']);
      if (dataReturned !== null) {
      }
    });

    return await modal.present();
  }
  
  async openModalError() { 
    const modal = await this.modalController.create({
      component: LocationErrorContentPage,
      cssClass: 'custom_otp_modal',
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    }); 

    modal.onDidDismiss().then((dataReturned) => {
		
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
		//alert("register location");
		//alert(JSON.parse(this.dataReturned));
		this.location_data = JSON.parse(this.dataReturned);
		 //this.model.location_value = this.dataReturned.colony_name+", "+this.dataReturned.city+", "+this.dataReturned.state+", "+this.dataReturned.country+", "+this.dataReturned.postalCode; 
		 
      }
    });

    return await modal.present();
  }
  
  register(){
	var username = $("#v_username").val();
	var dob = $("#v_dob").val();
	console.log(username);
	console.log(dob);
	if(username == ''){
		this.presentAlert();
	}else if(dob == ''){
		this.presentAlert();
	}else if(this.volunteer_data.latitude == '' || this.volunteer_data.longitude == '' || this.volunteer_data.colony_name == '' || this.volunteer_data.city == '' || this.volunteer_data.state == '' || this.volunteer_data.country == '' || this.volunteer_data.postalCode == ''){
		this.presentAlert();
	}else{
		if(this.model.volunteer_id == '' || this.model.volunteer_id == null){
			let data = JSON.stringify({'app_user_id' : JSON.parse(localStorage.getItem('user_id')),'username' : username, 'dob' : dob, 'latitude' : this.volunteer_data.latitude, 'longitude' : this.volunteer_data.longitude,'colony_name' : this.volunteer_data.colony_name, 'city' : this.volunteer_data.city, 'state' : this.volunteer_data.state, 'country' : this.volunteer_data.country, 'postalCode' : this.volunteer_data.postalCode});
			this.fetch.register_volunteer(data).subscribe(res => {
				//alert(JSON.stringify(res));
				if(res.success == true){
					localStorage.setItem('volunteer_id', res.volunteer_id);  
					this.successFullRegistration();
					//this.router.navigate(['/home']);
				}
			});
		}else{
			let data = JSON.stringify({'id' : this.model.volunteer_id,'app_user_id' : JSON.parse(localStorage.getItem('user_id')),'username' : username, 'dob' : dob, 'latitude' : this.volunteer_data.latitude, 'longitude' : this.volunteer_data.longitude,'colony_name' : this.volunteer_data.colony_name, 'city' : this.volunteer_data.city, 'state' : this.volunteer_data.state, 'country' : this.volunteer_data.country, 'postalCode' : this.volunteer_data.postalCode});
			console.log(data);
			this.fetch.update_volunteer(data).subscribe(res => {
				//alert(JSON.stringify(res));
				if(res.success == true){
					localStorage.setItem('volunteer_id', res.volunteer_id);  
					this.router.navigate(['/home']);
				}
			});
		}
	}
  }
  async presentAlert() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: 'Please fill all the details',
			buttons: ['Okay']
		});
		await alert.present();
  }
}
