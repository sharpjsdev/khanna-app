import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CurrentLocationContentPage } from '../modal/current-location-content/current-location-content.page';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { NotificationPage } from '../modal/notification/notification.page';
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
	location_data:any;
	saved_address:any=[];
	donate_address:any=[];
  dataReturned: any;
  notification:any=[];
  constructor(
    public modalController: ModalController,
	private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
	private storage : StorageService,
	public alertController: AlertController,
	private platform: Platform,
	private location: Location
  ) {
	this.platform.backButton.subscribeWithPriority(10, () => {
		this.location.back();
	});
	  }

  ngOnInit() { 
	this.model.search = false;
	
  }
  ionViewWillEnter(){
	this.model.is_volunteer = 0;
	if(localStorage.getItem('volunteer_approve') != null){
		this.model.is_volunteer = localStorage.getItem('volunteer_approve');
	}
	this.model.alert_text = 'Please fill all the details';
	this.model.okay = 'okay';
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	//this.fetch.getKeyText(lang_code).subscribe(res => {
		let res = this.storage.getScope();
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
		let item7 = res.find(i => i.key_text === 'PROCEED');
			this.model.key_text7 = item7[lang_code]; 
		let item8 = res.find(i => i.key_text === 'CURRENT_LOCATION');
			this.model.key_text8 = item8[lang_code]; 
		let item11 = res.find(i => i.key_text === 'HOME');
			this.model.key_text11 = item11[lang_code];
		let item9 = res.find(i => i.key_text === 'ACTIVITY');
			this.model.key_text9 = item9[lang_code];
		let item10 = res.find(i => i.key_text === 'VOLUNTEER');
			this.model.key_text10 = item10[lang_code];
		let item12 = res.find(i => i.key_text === 'OTHER');
			this.model.key_text12 = item12[lang_code];
		
	//});
	
	this.model.user_id = JSON.parse(localStorage.getItem('user_id'));
	var donor_location = JSON.parse(localStorage.getItem('donor_location'));
	var donate_address_type = JSON.parse(localStorage.getItem('donate_address_type'));
	//if(donate_address_type != null){
		$('#donate_address_type_'+1).addClass('active'); 
	//}
	// if(donor_location == null){
	// 	this.fetch.getUserLocationForDonation(this.model.user_id).subscribe(res => {
	// 		if(res['success'] == true){
	// 			console.log(res['data']);
	// 			this.location_data = res['data'];
	// 		}else{
	// 			this.location_data = null;
	// 		}
	// 	});
	// }else{
	// 	this.location_data = donor_location;
	// }
	this.fetch.get_user_locations(this.model.user_id).subscribe(res => {
		if(res['success'] == true){
			this.saved_address = res['data'];
			setTimeout(()=>{
				$('.addr-1').show();
				$('.addr-2').hide();
				$('.addr-3').hide();
				$('.addr-4').hide();
			},1000);
			
			//this.donate_address = res['data'][0];  
		}
	});
  }
  address_type(val){
	this.model.address_type = val; 
	
	
	if(val == 1){
		$('#donate_address_type_'+val).addClass('active');  
		$('#donate_address_type_2').removeClass('active');
		$('#donate_address_type_3').removeClass('active');
		$('#donate_address_type_4').removeClass('active');
		$('.addr-1').show();
		$('.addr-2').hide();
		$('.addr-3').hide();
		$('.addr-4').hide();   
	}else if(val == 2){
		$('#donate_address_type_'+val).addClass('active');  
		$('#donate_address_type_1').removeClass('active');
		$('#donate_address_type_3').removeClass('active'); 
		$('#donate_address_type_4').removeClass('active'); 
		$('.addr-1').hide();
		$('.addr-2').show();
		$('.addr-3').hide();
		$('.addr-4').hide();    
	}else if(val == 3){
		$('#donate_address_type_'+val).addClass('active');  
		$('#donate_address_type_1').removeClass('active');
		$('#donate_address_type_2').removeClass('active');
		$('#donate_address_type_4').removeClass('active');
		$('.addr-1').hide();
		$('.addr-2').hide();
		$('.addr-3').show(); 
		$('.addr-4').hide();   
	}
	else if(val == 4){
		$('#donate_address_type_'+val).addClass('active');  
		$('#donate_address_type_1').removeClass('active');
		$('#donate_address_type_2').removeClass('active');
		$('#donate_address_type_3').removeClass('active'); 
		$('.addr-1').hide();
		$('.addr-2').hide();
		$('.addr-3').hide();
		$('.addr-4').show();    
	}
	localStorage.setItem('donate_address_type', val);
  }
  async openModalCurrentLocation() {
	  this.address_type(4);
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
			this.donate_address =this.dataReturned;
			// alert(JSON.stringify(this.location_data));
		}
    });

    return await modal.present();
  }
  selected_address(data){
	this.donate_address = data;
  }
  proceed(){
	//alert(JSON.stringify(this.location_data));
	// var donate_address_type = JSON.parse(localStorage.getItem('donate_address_type'));
	// if(donate_address_type == null){
	// 	this.presentAlert();
	// }else 
	console.log(this.donate_address.length);
	this.model.search = true;
	if(this.donate_address.length == 0){
		$('#error_msg').css('display','block');
		this.model.search = false;
	}
	else{
		console.log(this.location_data);
		//alert(JSON.stringify(this.location_data));
		$('#error_msg').css('display','none');
		this.fetch.donate_food_location(this.donate_address).subscribe(res => {
			console.log(res);
			//alert(JSON.stringify(res));
			this.model.search = false;
			this.router.navigate(['/donate-food-members',res.donate_food_id]);
		});
	}
	// else {
	// 	this.presentAlert();
	// }
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
