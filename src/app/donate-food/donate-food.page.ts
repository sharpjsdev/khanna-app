import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CurrentLocationContentPage } from '../modal/current-location-content/current-location-content.page';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Location } from "@angular/common";

declare var $:any;

@Component({
  selector: 'app-donate-food',
  templateUrl: './donate-food.page.html',
  styleUrls: ['./donate-food.page.scss'],
})
export class DonateFoodPage implements OnInit {
	model:any={};
	location_data:any=[];
  dataReturned: any;
  constructor(
    public modalController: ModalController,
	private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
	public alertController: AlertController,
	private platform: Platform,
	private location: Location
  ) {
	this.platform.backButton.subscribeWithPriority(10, () => {
		this.location.back();
	});
	  }

  ngOnInit() { 
	this.model.alert_text = 'Please fill all the details';
	this.model.okay = 'okay';
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	this.fetch.getKeyText(lang_code).subscribe(res => {
		let item1 = res.find(i => i.key_text === 'SELECT_LOCATION');
			this.model.key_text1 = item1[lang_code];
		let item2 = res.find(i => i.key_text === 'HOME');
			this.model.key_text2 = item2[lang_code];
		let item3 = res.find(i => i.key_text === 'OFFICE');
			this.model.key_text3 = item3[lang_code];
		let item4 = res.find(i => i.key_text === 'ADD_FAVORITE_LOCATION');
			this.model.key_text4 = item4[lang_code];
		let item5 = res.find(i => i.key_text === 'PLEASE_FILL_ALL_THE_DETAILS');
			this.model.alert_text = item5[lang_code];
		let item6 = res.find(i => i.key_text === 'OKAY');
			this.model.okay = item6[lang_code]; 
			
	});
	this.model.user_id = JSON.parse(localStorage.getItem('user_id'));
	var donor_location = JSON.parse(localStorage.getItem('donor_location'));
	var donate_address_type = JSON.parse(localStorage.getItem('donate_address_type'));
	if(donate_address_type != null){
		$('#donate_address_type_'+donate_address_type).addClass('active'); 
	}
	if(donor_location == null){
		this.fetch.getUserLocationForDonation(this.model.user_id).subscribe(res => {
			if(res['success'] == true){
				console.log(res['data']);
				this.location_data = res['data'];
			}else{
				this.location_data = null;
			}
		});
	}else{
		this.location_data = donor_location;
	}
	
  }
  address_type(val){
	this.model.address_type = val; 
	if(val == 1){
		$('#donate_address_type_'+val).addClass('active');  
		$('#donate_address_type_2').removeClass('active');  
	}else if(val == 2){
		$('#donate_address_type_'+val).addClass('active');  
		$('#donate_address_type_1').removeClass('active');   
	}
	localStorage.setItem('donate_address_type', val);
  }
  async openModalCurrentLocation() {
	localStorage.setItem('set_confirm_location_route', JSON.stringify('donate-food'));
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
			//alert(JSON.stringify(this.location_data));
		}
    });

    return await modal.present();
  }
  proceed(){
	//alert(JSON.stringify(this.location_data));
	var donate_address_type = JSON.parse(localStorage.getItem('donate_address_type'));
	if(donate_address_type == null){
		this.presentAlert();
	}else if(this.location_data != null && this.location_data.latitude != "" && this.location_data.longitude != ""){
		console.log(this.location_data);
		//alert(JSON.stringify(this.location_data));
		this.fetch.donate_food_location(this.location_data).subscribe(res => {
			console.log(res);
			//alert(JSON.stringify(res));
			this.router.navigate(['/donate-food-members',res.donate_food_id]);
		});
	}else {
		this.presentAlert();
	}
  }
   async presentAlert() {
		const alert = await this.alertController.create({
		  cssClass: 'my-custom-class',
		  header: this.model.alert_text,
		  buttons: [this.model.okay]
		});
		await alert.present();
  }

}
