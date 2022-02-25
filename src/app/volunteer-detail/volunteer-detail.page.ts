import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { AlertController , ModalController } from '@ionic/angular';
import * as HighCharts from 'highcharts';
import { CancelAllotedfoodPage } from '../modal/cancel-allotedfood/cancel-allotedfood.page';

declare var $:any;
@Component({
  selector: 'app-volunteer-detail',
  templateUrl: './volunteer-detail.page.html',
  styleUrls: ['./volunteer-detail.page.scss'],
})
export class VolunteerDetailPage implements OnInit {
  model:any={};
  okay: any;
  head_tab: any;
  food_request:any=[];
  food_request_fulfill:any=[];
  volunteer_data:any=[];
  columnChart1:any;
  onthe_way: any = [];
  completed_way : any = [];
  weekly_completed : any;
  monthly_completed : any;
  volunteer_graph_data: any = [];
  volunteer_graph_accepted_data: any = [];
  dataReturned: any;
  full_count: any = "";
  active_count : any = "";
  x_cat_count : any = [];
  mylang: any = '';
  constructor(
    private fetch: FetchService,
    private storage : StorageService,
    public alertController: AlertController,
    private router: Router,
    private modalController: ModalController
  ) { }
  dynamicColumnChart(data,data2, cat, min, max, tickInterval) {
    
    let myChart = HighCharts.chart('my_highcharts', {
      chart: {
        type: 'column',
        backgroundColor: '#fff',
        height: 300,
      },
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: cat,
      },
      yAxis: {
        gridLineWidth: 0,
        min: min,
        max: max,
        tickInterval: tickInterval,
        tickPixelInterval : 1,
        title: {
          text: ''
        }
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        }
      },
      series: [{
        name: this.model.key_text27,
        type: undefined,
        color: '#ffcc00',
        data: data
          },{
            name: this.model.key_text28,
            type: undefined,
            color: '#999900',
            data: data2
              }]
      });
    setTimeout(function(){ myChart.reflow(); }, 2000);
    }
  ngOnInit() {
    this.head_tab = "tab-1"
    this.model.is_volunteer = localStorage.getItem('volunteer_approve');
  }
  segmentChanged(ev){
    $('#add_location_spinner').show();
    this.head_tab = ev.target.value;
    if(this.head_tab == 'tab-2'){
      this.fetch.my_ontheway_food(this.model.user_id).subscribe(res=>{
        $('#add_location_spinner').hide();
        this.onthe_way = res['data'];
      });
    }else if(this.head_tab == 'tab-3'){
      this.fetch.my_completed_food(this.model.user_id).subscribe(res=>{
        $('#add_location_spinner').hide();
      this.completed_way = res['data'];
      });
      this.todayGraph();
    }else if(this.head_tab == 'tab-1'){
      this.fetch.my_waiting_request(this.model.volunteer_id).subscribe(res => {
        $('#add_location_spinner').hide();
				this.food_request = res.data;
			});
    }
    
  }
  segmentChangedCompleted(ev){
    var vale = ev.target.value;
    if(vale == 'week'){
      this.weeklyGraph();
    }if(vale == 'month'){
      this.monthlyGraph();
    }if(vale == 'year'){
      this.yearlyGraph();
    }if(vale == 'today'){
      this.todayGraph();
    }
  }
  todayGraph(){
    $('#add_location_spinner').show();
    this.volunteer_graph_data = [];
    this.x_cat_count = [];
    this.volunteer_graph_accepted_data = [];
    this.fetch.volunteer_graph_today(this.model.user_id).subscribe(res => {
      $('#add_location_spinner').hide();
      for(var m = 0; m < res.data.length; m++){
        this.volunteer_graph_data.push(0);
      }
      let calcmax1 = 12;
      for(var k = 0; k < res.data.length; k++){
        var index1 = k;
        this.volunteer_graph_data[index1] = res.data[k].cnt;
        this.x_cat_count.push(res.data[k].time);
      }
      this.fetch.volunteer_graph_today_accepted(this.model.user_id).subscribe(res1 => {
        for(var l = 0; l < res1.data.length; l++){
          this.volunteer_graph_accepted_data.push(0);
        }
        let calcmax1 = 12;
        for(var kk = 0; kk < res1.data.length; kk++){
          var index2 = kk;
          this.volunteer_graph_accepted_data[index2] = res1.data[kk].cnt;
          this.x_cat_count.push(res1.data[kk].time);
        }
		this.model.min = 0;
		this.model.max = 30;
		this.model.tickInterval = 5;
		this.dynamicColumnChart(this.volunteer_graph_data,this.volunteer_graph_accepted_data, this.x_cat_count, this.model.min, this.model.max, this.model.tickInterval);
	});
});
this.fetch.count_today_donation_fullfiled(this.model.user_id).subscribe(res => {
  if(res['success'] == true){
    this.full_count = res.data[0].total_donation;
  }
  
})
this.fetch.count_today_donation_accepted(this.model.user_id).subscribe(res => {
  if(res['success'] == true){
    this.active_count = res.data[0].total_donation;
  }
  
})
  }
  weeklyGraph(){
    $('#add_location_spinner').show();
    this.volunteer_graph_data = [];
    this.volunteer_graph_accepted_data = [];
	  this.fetch.volunteer_graph_weekly(this.model.user_id).subscribe(res => {
    $('#add_location_spinner').hide();
		for(var i = 0; i < 7; i++){
			this.volunteer_graph_data.push(0);
		}
		let calcmax = 12;
		for(var j = 0; j < res.data.length; j++){
			var index = res.data[j].day-1;
			this.volunteer_graph_data[index] = res.data[j].cnt;
			if(res.data[j].cnt > calcmax){
				calcmax = res.data[j].cnt;
			}
		}
    this.fetch.volunteer_graph_weekly_accepted(this.model.user_id).subscribe(res1 => {
      $('#add_location_spinner').hide();
      for(var m = 0; m < 7; m++){
        this.volunteer_graph_accepted_data.push(0);
      }
      let calcmax1 = 12;
      for(var k = 0; k < res1.data.length; k++){
        var index1 = res1.data[k].day-1;
        this.volunteer_graph_accepted_data[index1] = res1.data[k].cnt;
        if(res1.data[k].cnt > calcmax1){
          calcmax1 = res1.data[k].cnt;
        }
      }
		this.model.xcat = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
		this.model.min = 0;
		this.model.max = 30;
		this.model.tickInterval = 5;
		this.dynamicColumnChart(this.volunteer_graph_data,this.volunteer_graph_accepted_data, this.model.xcat, this.model.min, this.model.max, this.model.tickInterval);
	});
});
  this.fetch.count_weekly_donation_fullfiled(this.model.user_id).subscribe(res => {
    if(res['success'] == true){
      this.full_count = res.data[0].total_donation;
    }
    
  })
  this.fetch.count_weekly_donation_accepted(this.model.user_id).subscribe(res => {
    if(res['success'] == true){
      this.active_count = res.data[0].total_donation;
    }
    
  })
  }
  monthlyGraph(){
    $('#add_location_spinner').show();
    this.volunteer_graph_data = [];
    this.volunteer_graph_accepted_data = [];
    this.fetch.volunteer_graph_monthly(this.model.user_id).subscribe(res => {
      this.volunteer_graph_data = [0,0,0,0];
      for(var j = 0; j < res.data.length; j++){
        var index = res.data[j].Week_no - 1;
        this.volunteer_graph_data[index] = res.data[j].cnt;
      }
      $('#add_location_spinner').hide();
      this.fetch.volunteer_graph_monthly_accepted(this.model.user_id).subscribe(res1 => {
        this.volunteer_graph_accepted_data = [0,0,0,0];
        for(var k = 0; k < res1.data.length; k++){
          var index1 = res1.data[k].Week_no - 1;
          this.volunteer_graph_accepted_data[index1] = res1.data[k].cnt;
        }
      this.model.xcat = ['Week1', 'Week2', 'Week3', 'Week4', 'Week5'];
      this.model.min = 0;
      this.model.max = 60;
      this.model.tickInterval = 20;
      this.dynamicColumnChart(this.volunteer_graph_data,this.volunteer_graph_accepted_data, this.model.xcat, this.model.min, this.model.max, this.model.tickInterval);
    });
  });
    this.fetch.count_monthly_donation_fullfiled(this.model.user_id).subscribe(res => {
      if(res['success'] == true){
        this.full_count = res.data[0].total_donation;
      }
      
    })
    this.fetch.count_monthly_donation_accepted(this.model.user_id).subscribe(res => {
      if(res['success'] == true){
        this.active_count = res.data[0].total_donation;
      }
      
    })
  }
  yearlyGraph(){
    this.volunteer_graph_data = [];
    this.volunteer_graph_accepted_data = [];
    $('#add_location_spinner').show();
    this.fetch.volunteer_graph_yearly(this.model.user_id).subscribe(res => {
      this.volunteer_graph_data = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(var j = 0; j < res.data.length; j++){
        var index = res.data[j].month - 1;
        this.volunteer_graph_data[index] = res.data[j].cnt;
      }
      $('#add_location_spinner').hide();
      this.fetch.volunteer_graph_yearly_accepted(this.model.user_id).subscribe(res1 => {
        this.volunteer_graph_accepted_data = [0,0,0,0,0,0,0,0,0,0,0,0];
        for(var k = 0; k < res1.data.length; k++){
          var index1 = res1.data[k].month - 1;
          this.volunteer_graph_accepted_data[index1] = res1.data[k].cnt;
        }
      this.model.xcat = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      this.model.min = 0;
      this.model.max = 60;
      this.model.tickInterval = 20;
      this.dynamicColumnChart(this.volunteer_graph_data,this.volunteer_graph_accepted_data, this.model.xcat, this.model.min, this.model.max, this.model.tickInterval);
      })
      
    });
    this.fetch.count_yearly_donation_fullfiled(this.model.user_id).subscribe(res => {
      if(res['success'] == true){
        this.full_count = res.data[0].total_donation;
      }
      
    })
    this.fetch.count_yearly_donation_accepted(this.model.user_id).subscribe(res => {
      if(res['success'] == true){
        this.active_count = res.data[0].total_donation;
      }
      
    })
  }
  

  ionViewDidEnter(){
    this.model.app_user_id = localStorage.getItem("user_id");
    let user = JSON.stringify({'id': this.model.app_user_id});
      this.fetch.profile(user).subscribe(res => {
      this.model.login_username = res['username'];
      
    });
    this.model.mode = 'WALKING';
    var lang_code = JSON.parse(localStorage.getItem('lang'));
    console.log(lang_code);
    this.mylang = lang_code;
   // this.fetch.getKeyText(lang_code).subscribe(res => {
    let res = this.storage.getScope();	
     let item1 = res.find(i => i.key_text === 'WAITING');
       this.model.key_text1 = item1[lang_code];
     let item2 = res.find(i => i.key_text === 'ON_THE_WAY');
       this.model.key_text2 = item2[lang_code];
     let item3 = res.find(i => i.key_text === 'COMPLETED');
       this.model.key_text3 = item3[lang_code];
     let item4 = res.find(i => i.key_text === 'OKAY');
       this.model.key_text4 = item4[lang_code]; 
     let item5 = res.find(i => i.key_text === 'PLEASE_FILL_ALL_THE_DETAILS');
       this.model.key_text5 = item5[lang_code]; 
     let item6 = res.find(i => i.key_text === 'REASON_FOR_CANCEL_FOOD_REQUEST');
       this.model.key_text6 = item6[lang_code]; 
     let item7 = res.find(i => i.key_text === 'CANCEL');
       this.model.key_text7 = item7[lang_code]; 
     let item8 = res.find(i => i.key_text === 'TODAY');
       this.model.key_text8 = item8[lang_code]; 
     let item10 = res.find(i => i.key_text === 'HOME');
     let item9 = res.find(i => i.key_text === 'FOOD_REQUESTS');
			this.model.key_text9 = item9[lang_code];
       this.model.key_text10 = item10[lang_code];
     let item11 = res.find(i => i.key_text === 'ACTIVITY');
       this.model.key_text11 = item11[lang_code];
     let item12 = res.find(i => i.key_text === 'VOLUNTEER');
       this.model.key_text12 = item12[lang_code];
    let item17 = res.find(i => i.key_text === 'PLEASE_FILL_ALL_THE_DETAILS');
    this.model.key_text17 = item17[lang_code];	
    let item18 = res.find(i => i.key_text === 'WEEK');
    this.model.key_text18 = item18[lang_code];	
    let item19 = res.find(i => i.key_text === 'MONTH');
    this.model.key_text19 = item19[lang_code];
    let item20 = res.find(i => i.key_text === 'YEAR');
    this.model.key_text20 = item20[lang_code];
    let item21 = res.find(i => i.key_text === 'TOTAL_DONATIONS_ACCEPTED');
    this.model.key_text21 = item21[lang_code];
    let item22 = res.find(i => i.key_text === 'TOTAL_DONATIONS_FULLFILLED');
    this.model.key_text22 = item22[lang_code];	
    let item23 = res.find(i => i.key_text === 'FOOD_FOR');
		this.model.key_text23 = item23[lang_code];
		let item24 = res.find(i => i.key_text === 'PERSONS');
		this.model.key_text24 = item24[lang_code];		
    let item25 = res.find(i => i.key_text === 'VIEW_FEEDBACK');
    this.model.key_text25 = item25[lang_code];
    let item26 = res.find(i => i.key_text === 'SHARE_FEEDBACK');
    this.model.key_text26 = item26[lang_code];	
    let item27 = res.find(i => i.key_text === 'DONATION_FULFILLED');
    this.model.key_text27 = item27[lang_code];		
    let item28 = res.find(i => i.key_text === 'DONATION_ACCEPTED');
    this.model.key_text28 = item28[lang_code];			
    let item29 = res.find(i => i.key_text === 'PEOPLE');
    this.model.key_text29 = item29[lang_code];
    let item30 = res.find(i => i.key_text === 'PERSON');
		this.model.key_text30 = item30[lang_code];		
    let item31 = res.find(i => i.key_text === 'TYPE_HERE');
		this.model.key_text31 = item31[lang_code];
    let item32 = res.find(i => i.key_text === 'FOOD');
		this.model.key_text32 = item32[lang_code];
    let item33 = res.find(i => i.key_text === 'FOR');
		this.model.key_text33 = item33[lang_code];
    		
   //});

   this.model.volunteer_id = '';
   var user_id = JSON.parse(localStorage.getItem('user_registerd'));
   this.model.user_id = user_id;
   this.fetch.v_check(user_id).subscribe(res => {
		if(res.success == true){
			this.model.status = res.status;
			this.model.volunteer_id = res.data;
			this.fetch.v_edit(this.model.volunteer_id).subscribe(res1 => {
				this.volunteer_data = res1.data;  
				this.model.app_status = res1.data.app_status == 1 ? true : false;
			});
			
			
			if(this.model.status != 1){
				this.router.navigate(['/volunteer-food-request']);
			}
			this.fetch.my_waiting_request(this.model.volunteer_id).subscribe(res => {
				this.food_request = res.data;
			});
		}else{
			this.model.status = 0;
			this.router.navigate(['/volunteer-food-request']);
		}
	if(this.model.volunteer_id == ''){
		this.router.navigate(['/volunteer-food-request']);
	}
	});
  
   }
   async presentAlertPrompt(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.model.key_text6,
      inputs: [
        {
          name: 'reason',
		      id: 'cancel_rsn',
          type: 'textarea',
          placeholder: this.model.key_text31
        }
      ],
      buttons: [
        {
          text: this.model.key_text7,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: this.model.key_text4,
          handler: () => {
            
			
			var rsn = $('#cancel_rsn').val();
			if(rsn == ''){
				this.presentAlert();
			}else{
				$("#req_list_"+id).hide();
				let data = JSON.stringify({'v_id' : id, 'rsn' : rsn, 'status' : 3});
				this.fetch.volunteer_cancel_requested_food(data).subscribe(res => {
					this.fetch.my_waiting_request(this.model.volunteer_id).subscribe(res => {
				
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
  async cancelAllotedRequest(id,food_id,donar_id,no_of_person,food_type) {
	  
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
				let data = JSON.stringify({'food_id':food_id,'logged_in_user':this.model.login_username, 'no_of_person':no_of_person, 'app_user_id' : this.model.app_user_id, 'food_type' : food_type, 'notification_type' : 3, 'to' : donar_id, 'from' : this.model.app_user_id, 'getFoodId' : id });
			  this.fetch.notify_donar_donate(data).subscribe(res => {
					this.fetch.my_ontheway_food(this.model.user_id).subscribe(res=>{
            $('#add_location_spinner').hide();
            this.onthe_way = res['data'];
          });
				});
				
			}
		}
    });

    return await modal.present();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.model.key_text5,
      buttons: [this.model.key_text4]
    });
    await alert.present();
    }
}
