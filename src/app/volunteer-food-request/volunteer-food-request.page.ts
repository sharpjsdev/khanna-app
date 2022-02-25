import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { AlertController , ModalController } from '@ionic/angular';
import { VolunteerFoodRequestContentPage } from '../modal/volunteer-food-request-content/volunteer-food-request-content.page';
import { ErrorMsgService } from '../error-msg.service';
declare var $:any;
@Component({
  selector: 'app-volunteer-food-request',
  templateUrl: './volunteer-food-request.page.html',
  styleUrls: ['./volunteer-food-request.page.scss'],
})
export class VolunteerFoodRequestPage implements OnInit {
  model:any={};
  food_request:any=[];
  food_request_fulfill:any=[];
  volunteer_data:any=[];
  dataReturned: any;
  okay:any;
  constructor(
    public errorMsg : ErrorMsgService,
    public modalController: ModalController,
    public alertController: AlertController,
    private router: Router,
    private fetch: FetchService,
    private storage : StorageService,
  ) { }

  ngOnInit() {
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
     let item10 = res.find(i => i.key_text === 'HOME');
       this.model.key_text10 = item10[lang_code];
     let item11 = res.find(i => i.key_text === 'ACTIVITY');
       this.model.key_text11 = item11[lang_code];
     let item12 = res.find(i => i.key_text === 'VOLUNTEER');
       this.model.key_text12 = item12[lang_code];
     let item16 = res.find(i => i.key_text === 'OKAY');
       this.okay = item16[lang_code];
    let item17 = res.find(i => i.key_text === 'PLEASE_FILL_ALL_THE_DETAILS');
    this.model.key_text17 = item17[lang_code];			
   //});

   this.model.volunteer_id = '';
   var user_id = JSON.parse(localStorage.getItem('user_registerd'));
   this.model.user_id = user_id;
   this.fetch.v_check(user_id).subscribe(res => {
     if(res.success == true){
       this.model.status = res.status;
       this.model.volunteer_id = res.data;
       
       if(this.model.status != 1){
         this.router.navigate(['/volunteer-detail']);
       }
     }else{
       this.model.status = 0;
       this.router.navigate(['/volunteer-detail']);
     }
   if(this.model.volunteer_id == ''){
     this.router.navigate(['/volunteer-detail']);
   }
   });
   this.model.food_type = '';
 
   }
   ionViewWillEnter(){
    this.model.is_volunteer = 0;
    if(localStorage.getItem('volunteer_approve') != null){
      this.model.is_volunteer = localStorage.getItem('volunteer_approve');
    }
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
      if(name == ''){
        this.errorMsg.showModal(this.model.key_text17);
      }else if(this.model.food_type == ''){
        this.errorMsg.showModal(this.model.key_text17);
      }else if(no_of_people == ''){
        this.errorMsg.showModal(this.model.key_text17);
      }else{
        let data = JSON.stringify({'volunteer_id' : this.model.volunteer_id, 'name' : name, 'food_type' : this.model.food_type,'no_of_people' : no_of_people});
        this.fetch.volunteer_request(data).subscribe(res => {
          this.food_request.push(res['data']);
          this.openSuccessModal(res['data']);
        });
      }
      }
      async openSuccessModal(data) { 
        const modal = await this.modalController.create({
        component: VolunteerFoodRequestContentPage,
        cssClass: 'custom_donate_food_modal',
        componentProps: {
          "paramID": 123,
          "paramTitle": "Test Title",
          "request_data" : data,
        }
        });
    
        modal.onDidDismiss().then((dataReturned) => {
        this.router.navigate(['/volunteer-detail']);
        
        if (dataReturned !== null) {
          this.dataReturned = dataReturned.data;
          
        }
        });
    
        return await modal.present();
      }
}
