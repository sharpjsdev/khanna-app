import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';

declare var $:any;

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.page.html',
  styleUrls: ['./volunteer.page.scss'],
})
export class VolunteerPage implements OnInit {
model:any={};
food_request:any=[];
  constructor(
	public alertController: AlertController,
	private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
  ) { }

  ngOnInit() {
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	this.fetch.getKeyText(lang_code).subscribe(res => {
		let item1 = res.find(i => i.key_text === 'NAME');
			this.model.key_text1 = item1[lang_code];
		let item2 = res.find(i => i.key_text === 'TYPE_HERE');
			this.model.key_text2 = item2[lang_code];
		let item3 = res.find(i => i.key_text === 'SELECT_TYPE_OF_FOOD');
			this.model.key_text3 = item3[lang_code];
		let item4 = res.find(i => i.key_text === 'VEG');
			this.model.key_text4 = item4[lang_code]; 
		let item5 = res.find(i => i.key_text === 'NON_VEG');
			this.model.key_text5 = item5[lang_code]; 
		let item6 = res.find(i => i.key_text === 'BOTH');
			this.model.key_text6 = item6[lang_code]; 
		let item7 = res.find(i => i.key_text === 'FOOD_NEEDED_FOR_HOW_MANY_PEOPLE');
			this.model.key_text7 = item7[lang_code]; 
		let item8 = res.find(i => i.key_text === 'UPLOAD_FOOD_REQUEST');
			this.model.key_text8 = item8[lang_code]; 
		let item9 = res.find(i => i.key_text === 'FOOD_REQUESTS');
			this.model.key_text9 = item9[lang_code];
		
	});
	/* this.model.volunteer_id = JSON.parse(localStorage.getItem('volunteer_id'));
	console.log(this.model.volunteer_id);
	alert(this.model.volunteer_id); */
	this.model.volunteer_id = '';
	var user_id = JSON.parse(localStorage.getItem('user_registerd'));
	console.log(user_id);
	this.fetch.v_check(user_id).subscribe(res => {
		console.log(res);
		if(res.success == true){
			this.model.volunteer_id = res.data;
			this.fetch.get_request(this.model.volunteer_id).subscribe(res => {
				console.log(res.data);
				this.food_request = res.data;
			});
		}
		//alert(this.model.volunteer_id);
	if(this.model.volunteer_id == ''){
		this.router.navigate(['/volunteer-request']);
	}
	});
	
	this.model.food_type = '';
  }
  
  food_type(val){
	this.model.food_type = val;
	if(val == 1){
		$('#v_food_'+val).addClass('active');  
		$('#v_food_2').removeClass('active');  
		$('#v_food_3').removeClass('active');  
	}else if(val == 2){
		$('#v_food_'+val).addClass('active');  
		$('#v_food_1').removeClass('active');  
		$('#v_food_3').removeClass('active');    
	}else{
		$('#v_food_'+val).addClass('active');  
		$('#v_food_2').removeClass('active');  
		$('#v_food_1').removeClass('active');     
	}
  }
  upload_req(){
	var name = $('#v_r_name').val();
	var no_of_people = $('#v_r_number').val();
	//console.log(no_of_people);
	if(name == ''){
		this.presentAlert();
	}else if(this.model.food_type == ''){
		this.presentAlert();
	}else if(no_of_people == ''){
		this.presentAlert();
	}else{
		let data = JSON.stringify({'volunteer_id' : this.model.volunteer_id, 'name' : name, 'food_type' : this.model.food_type,'no_of_people' : no_of_people});
		console.log(data);
		this.fetch.volunteer_request(data).subscribe(res => {
			console.log(res);
			this.food_request.push(res['data']);
		});
	}
  }
  receive_requested_food(id){
	  $("#req_list_"+id).hide();
	let data = JSON.stringify({'req_id': id, 'status' : 1 });
	this.fetch.volunteer_receive_requested_food(data).subscribe(res => {
		console.log(res);
	});
  }
  async presentAlert() {
	const alert = await this.alertController.create({
		cssClass: 'my-custom-class',
		header: 'Please fill all the details',
		buttons: ['Okay']
	});
	await alert.present();
  }
  async presentAlertPrompt(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Reason For Cancel Food Request!',
      inputs: [
        {
          name: 'reason',
		  id: 'cancel_rsn',
          type: 'textarea',
          placeholder: 'Type Here...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            
			
			var rsn = $('#cancel_rsn').val();
			console.log(rsn);
			if(rsn == ''){
				this.presentAlert();
			}else{
				$("#req_list_"+id).hide();
				let data = JSON.stringify({'v_id' : id, 'rsn' : rsn, 'status' : 3});
				this.fetch.volunteer_cancel_requested_food(data).subscribe(res => {
					console.log(res);
				});
			}
			
          }
        }
      ]
    });

    await alert.present();
  }

}
