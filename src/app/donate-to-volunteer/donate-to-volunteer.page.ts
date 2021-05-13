import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-donate-to-volunteer',
  templateUrl: './donate-to-volunteer.page.html',
  styleUrls: ['./donate-to-volunteer.page.scss'],
})
export class DonateToVolunteerPage implements OnInit {
  model:any={};
  food_request:any=[];
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fetch: FetchService,
    private storage : StorageService,
  ) { }

  ngOnInit() {
    this.model.is_volunteer = 0;
    if(localStorage.getItem('volunteer_approve') != null){
      this.model.is_volunteer = localStorage.getItem('volunteer_approve');
    }
     this.model.volunteer_id = this.route.snapshot.params['id']
     this.model.user_id = JSON.parse(localStorage.getItem('user_registerd'));
     this.model.food_type = '';
     $('#v_food_1').addClass('active'); 
     this.fetch.get_request(this.model.volunteer_id).subscribe(res => {
      console.log(res.data);
      this.food_request = res.data;
    });
  }
  food_type(val){
   
    this.model.food_type = val;
    if(val == 1){
     
      $('#d_food_1').addClass('active');  
      $('#d_food_2').removeClass('active');  
      $('#d_food_3').removeClass('active');  
    }else if(val == 2){
      $('#d_food_2').addClass('active');  
      $('#d_food_1').removeClass('active');  
      $('#d_food_3').removeClass('active');    
    }else{
      $('#d_food_3').addClass('active');  
      $('#d_food_2').removeClass('active');  
      $('#d_food_1').removeClass('active');     
    }
  }
  ionViewWillEnter(){
    var lang_code = JSON.parse(localStorage.getItem('lang'));
    //this.fetch.getKeyText(lang_code).subscribe(res => {
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
      let item15 = res.find(i => i.key_text === 'DONATE_FOOD');
        this.model.key_text15 = item15[lang_code];
      let item16 = res.find(i => i.key_text === 'FOOD_FOR');
        this.model.key_text16 = item16[lang_code];
      let item17 = res.find(i => i.key_text === 'PERSONS');
        this.model.key_text17 = item17[lang_code];     
        	  	
    //});
  }
  upload_food(){
    let req = [];
    $("input[name='request']:checked").each ( function() {
     req.push($(this).val());
     
  });
    
    
	  
    //console.log(no_of_people);
    if(req.length==0){
        $('#error_no_of_people').show();
        
    }else{
        
        $('#error_no_of_people').hide();
      let data = JSON.stringify({'food_request_id' : req,'donor_id': this.model.user_id,'volunteer_id':this.model.volunteer_id});
      
      this.fetch.donate_food_to_volunteer(data).subscribe(res => {
        this.router.navigate(['/volunteer-request']);
      });
    }
  }

}
