import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';

declare var $:any;

@Component({
  selector: 'app-donate-food-members',
  templateUrl: './donate-food-members.page.html',
  styleUrls: ['./donate-food-members.page.scss'],
})
export class DonateFoodMembersPage implements OnInit {
model:any={};
  constructor(
  private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
	public alertController: AlertController
  ) { }

  ngOnInit() {
	this.model.alert_text = 'Please fill all the details';
	this.model.okay = 'okay';
	this.model.food_type = null;
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	this.fetch.getKeyText(lang_code).subscribe(res => {
		let item1 = res.find(i => i.key_text === 'SELECT_TYPE_OF_FOOD');
			this.model.key_text1 = item1[lang_code]; 
		let item2 = res.find(i => i.key_text === 'VEG');
			this.model.key_text2 = item2[lang_code]; 
		let item3 = res.find(i => i.key_text === 'NON_VEG');
			this.model.key_text3 = item3[lang_code]; 
		let item4 = res.find(i => i.key_text === 'BOTH');
			this.model.key_text4 = item4[lang_code]; 
		let item5 = res.find(i => i.key_text === 'TOTAL_NO._OF_PACKETS');
			this.model.key_text5 = item5[lang_code]; 
		let item6 = res.find(i => i.key_text === 'EACH_PACKET_CONTAINS_FOOD_FOR');
			this.model.key_text6 = item6[lang_code]; 
		let item7 = res.find(i => i.key_text === 'REVIEW_YOUR_DONATION');
			this.model.key_text7 = item7[lang_code]; 
		let item8 = res.find(i => i.key_text === 'HOME');
			this.model.key_text8 = item8[lang_code]; 
		let item9 = res.find(i => i.key_text === 'ACTIVITY');
			this.model.key_text9 = item9[lang_code]; 
		let item10 = res.find(i => i.key_text === 'VOLUNTEER');
			this.model.key_text10 = item10[lang_code];
		let item11 = res.find(i => i.key_text === 'PLEASE_FILL_ALL_THE_DETAILS');
			this.model.alert_text = item11[lang_code]; 
		let item12 = res.find(i => i.key_text === 'OKAY');
			this.model.okay = item12[lang_code]; 			
		
	});
  }
  food_type(val){
	this.model.food_type = val; 
	if(val == 1){
		$('#d_food_'+val).addClass('active');  
		$('#d_food_2').removeClass('active');  
		$('#d_food_3').removeClass('active');  
	}else if(val == 2){
		$('#d_food_'+val).addClass('active');  
		$('#d_food_1').removeClass('active');  
		$('#d_food_3').removeClass('active');    
	}else{
		$('#d_food_'+val).addClass('active');  
		$('#d_food_2').removeClass('active');  
		$('#d_food_1').removeClass('active');     
	}
  }
  review(){
	var number = $('#number').val();
	var number2 = $('#number2').val();
	if(number == '' || number == 0){
		this.presentAlert();
	}else if(number2 == '' || number2 == 0){
		this.presentAlert();
	}else if(this.model.food_type == null){
		this.presentAlert();
	}else{
		number = parseInt($('#number').val());
		number2 = parseInt($('#number2').val());
		var id = parseInt(this.route.snapshot.params['id']);
		var total_food = number*number2;
		let data = JSON.stringify({'id' : id, 'food_type' : this.model.food_type, 'no_of_packets' : number, 'each_packet_contain_food_for' : number2, 'total_food_for' : total_food});
		console.log(data);
		this.fetch.donate_food_details(data).subscribe(res => {
			console.log(res);
			this.router.navigate(['/donate-food-review',res.donate_food_id]);
		}); 
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
