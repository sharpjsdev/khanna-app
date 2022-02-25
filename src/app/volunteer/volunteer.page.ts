import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController,ActionSheetController } from '@ionic/angular';
import { AssignFoodPage } from '../assign-food/assign-food.page';
import { ModalController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.page.html',
  styleUrls: ['./volunteer.page.scss'],
  providers : [CallNumber],
})
export class VolunteerPage implements OnInit {
model:any={};
food_request:any=[];
food_request_fulfill:any=[];
volunteer_data:any=[];
dataReturned: any;
okay:any;
  constructor(
	public modalController: ModalController,
	public alertController: AlertController,
	private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
	public actionSheetController: ActionSheetController,
	private callNumber: CallNumber,
	private storage : StorageService,
  ) {
	
   }

  ngOnInit() {
	
  }

  ionViewWillEnter(){
	this.model.is_volunteer = 0;
	if(localStorage.getItem('volunteer_approve') != null){
		this.model.is_volunteer = localStorage.getItem('volunteer_approve');
	}
	/* this.model.volunteer_id = JSON.parse(localStorage.getItem('volunteer_id'));
	console.log(this.model.volunteer_id);
	alert(this.model.volunteer_id); */
	this.model.volunteer_id = '';
	var user_id = JSON.parse(localStorage.getItem('user_registerd'));
	console.log(user_id);
	this.model.user_id = user_id;
	this.fetch.v_check(user_id).subscribe(res => {
		console.log(res);
		if(res.success == true){
			this.model.status = res.status;
			this.model.volunteer_id = res.data;
			this.fetch.v_edit(this.model.volunteer_id).subscribe(res1 => {
				this.volunteer_data = res1.data;  
				this.model.app_status = res1.data.app_status == 1 ? true : false;
			});
			
			
			if(this.model.status != 1){
				this.router.navigate(['/volunteer-request']);
			}
			this.fetch.get_request(this.model.volunteer_id).subscribe(res => {
				console.log(res.data);
				this.food_request = res.data;
			});
			this.fetch.get_received_food(this.model.volunteer_id).subscribe(res => {
				this.food_request_fulfill = res.data;
			});
		}else{
			this.model.status = 0;
			this.router.navigate(['/volunteer-request']);
		}
		//alert(this.model.volunteer_id);
	if(this.model.volunteer_id == ''){
		this.router.navigate(['/volunteer-request']);
	}
	});
	
	this.model.food_type = '';
  }
  ionViewDidEnter(){
	 var lang_code = JSON.parse(localStorage.getItem('lang'));
	// this.fetch.getKeyText(lang_code).subscribe(res => {
	 let res = this.storage.getScope();	
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
		let item6 = res.find(i => i.key_text === 'ANY');
			this.model.key_text6 = item6[lang_code]; 
		let item7 = res.find(i => i.key_text === 'FOOD_NEEDED_FOR_HOW_MANY_PEOPLE');
			this.model.key_text7 = item7[lang_code]; 
		let item8 = res.find(i => i.key_text === 'UPLOAD_FOOD_REQUEST');
			this.model.key_text8 = item8[lang_code]; 
		let item9 = res.find(i => i.key_text === 'FOOD_REQUESTS');
			this.model.key_text9 = item9[lang_code];
		let item10 = res.find(i => i.key_text === 'HOME');
			this.model.key_text10 = item10[lang_code];
		let item11 = res.find(i => i.key_text === 'ACTIVITY');
			this.model.key_text11 = item11[lang_code];
		let item12 = res.find(i => i.key_text === 'VOLUNTEER');
			this.model.key_text12 = item12[lang_code];
		let item13 = res.find(i => i.key_text === 'NEARBY_OTHER_VOLUNTEER');
			this.model.key_text13 = item13[lang_code];
		let item14 = res.find(i => i.key_text === 'REQUEST_FOOD');
			this.model.key_text14 = item14[lang_code];
		let item15 = res.find(i => i.key_text === 'FOOD_RECEIVED');
			this.model.key_text15 = item15[lang_code];
		let item16 = res.find(i => i.key_text === 'OKAY');
			this.okay = item16[lang_code];			
	//});

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
			this.presentError('food request is uploaded');
		});
	}
  }
  async presentError(msg) {
	const alert = await this.alertController.create({
	  cssClass: 'my-custom-class',
	  message: msg,
	  buttons: [this.okay]
	});

	await alert.present();
}
  updateVolunteer(){
	  
	  if(this.food_request.length>0 && this.model.app_status == false){
	  this.presentActionSheet();
	  }else{
		// console.log(this.volunteer_data);
		var app_status = this.model.app_status == true ? 1 : 0;
		let data = JSON.stringify({'id' : this.model.volunteer_id,'app_user_id' : JSON.parse(localStorage.getItem('user_id')),'username' : this.volunteer_data.username,'dob' : this.volunteer_data.dob, 'latitude' : this.volunteer_data.latitude, 'longitude' : this.volunteer_data.longitude,'colony_name' : this.volunteer_data.colony_name, 'city' : this.volunteer_data.city, 'state' : this.volunteer_data.state, 'country' : this.volunteer_data.country, 'postalCode' : this.volunteer_data.postalCode,'status' : this.volunteer_data.status, 'shop_stall_name' : this.volunteer_data.shop_stall_name, 'working_hour' : this.volunteer_data.working_hour,'app_status':app_status,'countof_closeapp' : Number(this.volunteer_data.countof_closeapp)});
		console.log(data);
		
		this.fetch.update_volunteer(data).subscribe(res => {
			console.log('record update successfully');
			
		});
	}
  }
//   async receive_requested_food(id){

// 	const modal = await this.modalController.create({
// 		component: AssignFoodPage,
// 		cssClass: 'custom_receiver_confirm_modal',
// 		componentProps: {
// 		  "paramID": 123,
// 		  "paramTitle": "Test Title",
// 		  "request_food_id" : id
		  
// 		}
// 	  }); 
	  
		  
// 	  modal.onDidDismiss().then((dataReturned) => {
// 		if (dataReturned !== null) {
// 		  this.dataReturned = dataReturned.data;
// 			this.fetch.get_request(this.model.volunteer_id).subscribe(res => {
				
// 				this.food_request = res.data;
// 			});
// 		}
// 	  });
  
// 	  return await modal.present()
// 	//   $("#req_list_"+id).hide();
	
//   }
receive_requested_food(id){
	let data = JSON.stringify({'request_food_id': id, 'donate_food_id' : this.model.donate_food_id,'status':1 });
      this.fetch.volunteer_receive_requested_food(data).subscribe(res => {
		this.fetch.get_received_food(this.model.volunteer_id).subscribe(res => {
			this.food_request_fulfill = res.data;
		});
      });
}
cancelReceivedFood(id){
	let data = JSON.stringify({'request_food_id': id });
      this.fetch.volunteer_received_cancel_food(data).subscribe(res => {
		this.fetch.get_received_food(this.model.volunteer_id).subscribe(res => {
			this.food_request_fulfill = res.data;
		});
		this.fetch.get_request(this.model.volunteer_id).subscribe(res => {
			console.log(res.data);
			this.food_request = res.data;
		});
      });
}
  async presentAlert() {
	const alert = await this.alertController.create({
		cssClass: 'my-custom-class',
		message: 'Please fill all the details',
		buttons: ['Okay']
	});
	await alert.present();
  }
  async showAlert(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class custom_alert_1',
      header: 'Alert',
      message: "Please guide receiver to other near volunteer. Thank you",
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
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
					this.fetch.get_request(this.model.volunteer_id).subscribe(res => {
				
						this.food_request = res.data;
					});
				});
			}
			
          }
        }
      ]
    });

    await alert.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'NOTE: There are active donation receivers waiting',
      cssClass: 'my-custom-class',
	  buttons: [{
        text: 'Cancel all request and close app',
        handler: () => {
           var app_status = this.model.app_status == true ? 1 : 0;
		   let data = JSON.stringify({'id' : this.model.volunteer_id,'app_user_id' : JSON.parse(localStorage.getItem('user_id')),'username' : this.volunteer_data.username,'dob' : this.volunteer_data.dob, 'latitude' : this.volunteer_data.latitude, 'longitude' : this.volunteer_data.longitude,'colony_name' : this.volunteer_data.colony_name, 'city' : this.volunteer_data.city, 'state' : this.volunteer_data.state, 'country' : this.volunteer_data.country, 'postalCode' : this.volunteer_data.postalCode,'status' : this.volunteer_data.status, 'shop_stall_name' : this.volunteer_data.shop_stall_name, 'working_hour' : this.volunteer_data.working_hour,'app_status':app_status, 'countof_closeapp' : Number(this.volunteer_data.countof_closeapp)+1});
			
			
			this.fetch.update_volunteer(data).subscribe(res => {
				this.showAlert();
				console.log('record update successfully');
				
			});
			this.fetch.cancel_all_request(this.model.volunteer_id).subscribe(res=>{
				this.fetch.get_request(this.model.volunteer_id).subscribe(res => {
				
					this.food_request = res.data;
				});
			});
        }
      }, {
        text: 'Ok I will not close the app',
        handler: () => {
          this.model.app_status = true;
        }
      }
      ]
    });
    await actionSheet.present();
  }

  call(number){
	
	let data = JSON.stringify({'caller_id':this.model.user_id,'callee_mobile_no':number  });
			$('#add_location_spinner').show();
				this.fetch.add_call_detail(data).subscribe(res => {
					this.callNumber.callNumber(environment.phone_no, true)
					.then(res => { $('#add_location_spinner').show(); console.log('Launched dialer!', res); })
					.catch(err => console.log('Error launching dialer', err));
				});
 }

}
