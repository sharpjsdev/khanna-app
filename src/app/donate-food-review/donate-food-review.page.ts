import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DonateFoodContentPage } from '../modal/donate-food-content/donate-food-content.page';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';
declare var $:any;

@Component({
  selector: 'app-donate-food-review',
  templateUrl: './donate-food-review.page.html',
  styleUrls: ['./donate-food-review.page.scss'],
})
export class DonateFoodReviewPage implements OnInit {
model:any={};
food_data:any=[];
pending_data:any=[];
veg_food:any=[];
nonveg_food:any=[];
dataReturned: any;
notification:any=[];
  constructor(
    public modalController: ModalController,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
	private storage: StorageService,
	public alertController: AlertController
  ) { }

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
	///this.fetch.getKeyText(lang_code).subscribe(res => {
		let res = this.storage.getScope();
		let item1 = res.find(i => i.key_text === 'YOUR_PENDING_DONATIONS');
			this.model.key_text1 = item1[lang_code]; 
		let item2 = res.find(i => i.key_text === 'FOOD_FOR');
			this.model.key_text2 = item2[lang_code]; 
		let item3 = res.find(i => i.key_text === 'PERSONS');
			this.model.key_text3 = item3[lang_code]; 
		let item4 = res.find(i => i.key_text === 'YOUR_NEW_DONATION');
			this.model.key_text4 = item4[lang_code]; 
		let item5 = res.find(i => i.key_text === 'TOTAL_NO._OF_PACKETS');
			this.model.key_text5 = item5[lang_code]; 
		let item6 = res.find(i => i.key_text === 'EACH_PACKET_CONTAINS_FOOD_FOR');
			this.model.key_text6 = item6[lang_code]; 
		let item7 = res.find(i => i.key_text === 'TOTAL_FOOD_FOR');
			this.model.key_text7 = item7[lang_code]; 
		let item8 = res.find(i => i.key_text === 'HOME');
			this.model.key_text8 = item8[lang_code]; 
		let item9 = res.find(i => i.key_text === 'ACTIVITY');
			this.model.key_text9 = item9[lang_code]; 
		let item10 = res.find(i => i.key_text === 'VOLUNTEER');
			this.model.key_text10 = item10[lang_code];
		let item11 = res.find(i => i.key_text === 'TYPE_OF_FOOD');
			this.model.key_text11 = item11[lang_code];
		let item12 = res.find(i => i.key_text === 'PERSONS');
			this.model.key_text12 = item12[lang_code];
		let item13 = res.find(i => i.key_text === 'DONATE_FOOD');
			this.model.key_text13 = item13[lang_code];
		let item14 = res.find(i => i.key_text === 'PLEASE_FILL_ALL_THE_DETAILS');
			this.model.alert_text = item14[lang_code]; 
		let item15 = res.find(i => i.key_text === 'OKAY');
			this.model.okay = item15[lang_code]; 
		let item16 = res.find(i => i.key_text === 'CONFIRM_DONATE_REQUEST');
			this.model.key_text16 = item16[lang_code];	
		
	//});
	var id = parseInt(this.route.snapshot.params['id']);
	var id2 = parseInt(this.route.snapshot.params['id2']);
	this.model.veg = id;
	this.model.nonveg = id2;
	var user_id = JSON.parse(localStorage.getItem('user_registerd'));
	this.fetch.pending_donation(user_id).subscribe(res => {
		this.pending_data = res['data'];
	});
	if(id != 0){
	this.fetch.reviewFood(id).subscribe(res => {
		this.veg_food = res['data'];
	});
	}
	if(id2 != 0){
	this.fetch.reviewFood(id2).subscribe(res => {
		this.nonveg_food = res['data'];
	});
	}
  }
  
  packets(){
	this.food_data.total_no_of_packet = $("#number3").val();
	this.food_data.total_food_for = this.food_data.each_packet_contain_food_for * this.food_data.total_no_of_packet;
	
  }
  food_for(){ 
	this.food_data.each_packet_contain_food_for = $("#number4").val();
	//this.food_data.total_food_for = this.food_data.each_packet_contain_food_for * this.food_data.total_no_of_packet;  
	this.food_data.total_food_for = this.food_data.each_packet_contain_food_for;  
	
  }
  async openModalDonateFood() { 
    const modal = await this.modalController.create({
		component: DonateFoodContentPage,
		cssClass: 'custom_donate_food_modal',
		componentProps: {
			"paramID": 123,
			"paramTitle": "Test Title",
			"veg" : this.model.veg,
			"nonveg" : this.model.nonveg,
			"veg_food" : this.veg_food,
			"nonveg_food" : this.nonveg_food
		}
    });

    modal.onDidDismiss().then((dataReturned) => {
		localStorage.removeItem('donate_address_type'); 
		localStorage.removeItem('set_confirm_location_route'); 
		localStorage.removeItem('donor_location'); 
		this.router.navigate(['/home']);
		
		if (dataReturned !== null) {
			this.dataReturned = dataReturned.data;
			//alert('Modal Sent Data :'+ dataReturned);
			
		}
    });

    return await modal.present();
  }
  donate_food(){
		this.model.search = true;
		let data = JSON.stringify({'id' : this.model.veg, 'id2' : this.model.nonveg});
		this.router.navigate(['/donate-food-pickup-drop',this.model.veg,this.model.nonveg])
	// }
	
  }


}
