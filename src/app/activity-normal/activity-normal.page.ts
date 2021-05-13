import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { CancelAllotedfoodPage } from '../modal/cancel-allotedfood/cancel-allotedfood.page';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as HighCharts from 'highcharts';
import { ModalController,AlertController } from '@ionic/angular';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
declare var $:any;
declare let window: any;
@Component({
  selector: 'app-activity-normal',
  templateUrl: './activity-normal.page.html',
  styleUrls: ['./activity-normal.page.scss'],
  providers : [CallNumber],
})
export class ActivityNormalPage implements OnInit {
model:any={};
donation_graph_data:any=[];
blessing_this_week:any=[];
pending_data:any=[];
alloted_food : any=[];
request_food : any = [];
alloted_request_food : any = [];
reasons : any = [];
  dataReturned: any;
  constructor(
	private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
	private storage:StorageService,
	public modalController: ModalController,
	public alertController: AlertController,
	public browserTab: BrowserTab,
	private socialSharing: SocialSharing,
	private callNumber: CallNumber
  ) { }
slideOpts = {
    zoom: false,
	autoplay:true
  };
  ngOnInit(){
	this.model.receivertab = 0;
	this.model.donartab = 1;
	this.model.is_volunteer = 0;
	if(localStorage.getItem('volunteer_approve') != null){
		this.model.is_volunteer = localStorage.getItem('volunteer_approve');
	}
	  this.model.mode = 'WALKING';
	if(localStorage.getItem('isReceiverTab') != null){
		if(localStorage.getItem('isReceiverTab') == '1'){
			this.model.receivertab = 1;
			this.model.donartab = 0;
		}
		else if(localStorage.getItem('isReceiverTab') == '0'){
			this.model.receivertab = 0;
			this.model.donartab = 1;
		}
	}
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	//$('.receivertab').hide();
	$('#u_month_blessing_div').css('display', 'none');
	$('#u_week_blessing_div').css('display', 'block');
	setTimeout(function(){ 
		$('#activity_normal_spinner').css('display', 'none');
		$('#activity_normal_content').css('display', 'block');
	}, 100);
	this.model.user_id = JSON.parse(localStorage.getItem('user_registerd'));
	this.fetch.get_user_city(this.model.user_id).subscribe(res => {
		this.fetch.get_top_donors(res.data['city']).subscribe(res2 => {
			this.model.top_donors = res2.data;
		});
	});
	this.fetch.show_feedback(this.model.user_id).subscribe(res => {
		//console.log(res);
		this.model.feedback_data = res.data;
	});
	let user = JSON.stringify({'id': this.model.user_id});
	this.fetch.profile(user).subscribe(res => {
				
					this.model.login_username = res['username'];
					
					
				});
				
	this.fetch.pending_donation(this.model.user_id).subscribe(res => {
		this.pending_data = res['data'];
		//console.log(this.pending_data.length);
		// this.pending_data.forEach((val,i)=>{
		// 	if(val.alloted_user_id != null){
		// 	let alloted_user = JSON.stringify({'id': val.alloted_user_id});
		// 		this.fetch.profile(alloted_user).subscribe(res => {
				
		// 			val.alloted_user_name = res['username'];
		// 			val.mobile_number = res['mobile_no']
					
		// 		});
		// 		}
		// });
		
	});
	this.fetch.my_alloted_donation(this.model.user_id).subscribe(res=>{
		this.alloted_food = res['data'];
		//console.log(this.alloted_food);
		this.alloted_food.forEach((val,i)=>{
			var startTime = new Date(val.updated_at); 
			var endTime = new Date();
			//console.log(startTime);
			//console.log(endTime);
			var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
			var resultInMinutes = Math.round(difference / 60000);
			val.resultInMinutes = resultInMinutes;
		});
	});
	
	this.fetch.my_food_request(this.model.user_id).subscribe(res=>{
		this.request_food = res['data'];
		//console.log(this.request_food.length);
		
	});

	this.fetch.my_alloted_request(this.model.user_id).subscribe(res=>{
		this.alloted_request_food = res['data'];
		//console.log(this.alloted_request_food.length);
	});
  }
  ionViewWillEnter() {
	
	
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	let res = this.storage.getScope();
	//	this.fetch.getKeyText(lang_code).subscribe(res => {
			let item1 = res.find(i => i.key_text === 'WEEKLY');
				this.model.key_text1 = item1[lang_code];
			let item2 = res.find(i => i.key_text === 'MONTHLY');
				this.model.key_text2 = item2[lang_code];
			let item3 = res.find(i => i.key_text === 'BLESSINGS_THIS_WEEK');
				this.model.key_text3 = item3[lang_code];
			let item4 = res.find(i => i.key_text === 'BLESSINGS_THIS_MONTH');
				this.model.key_text4 = item4[lang_code];
			let item5 = res.find(i => i.key_text === 'HOME');
				this.model.key_text5 = item5[lang_code];
			let item6 = res.find(i => i.key_text === 'ACTIVITY');
				this.model.key_text6 = item6[lang_code];
			let item7 = res.find(i => i.key_text === 'VOLUNTEER');
				this.model.key_text7 = item7[lang_code];
			let item8 = res.find(i => i.key_text === 'TOTAL_BLESSINGS');
				this.model.key_text8 = item8[lang_code];
			let item9 = res.find(i => i.key_text === 'TOP_DONORS_FROM_YOUR_CITY');
				this.model.key_text9 = item9[lang_code];
			let item10 = res.find(i => i.key_text === 'DONATIONS');
				this.model.key_text10 = item10[lang_code];
			let item11 = res.find(i => i.key_text === 'YOUR_PENDING_DONATIONS');
				this.model.key_text11 = item11[lang_code];
			let item12 = res.find(i => i.key_text === 'FOOD_FOR');
				this.model.key_text12 = item12[lang_code];
			let item13 = res.find(i => i.key_text === 'PERSONS');
				this.model.key_text13 = item13[lang_code];
			let item14 = res.find(i => i.key_text === 'AVERAGE_RATING');
				this.model.key_text14 = item14[lang_code];
			let item15 = res.find(i => i.key_text === 'SAYS');
				this.model.key_text15 = item15[lang_code];
			let item16 = res.find(i => i.key_text === 'ALLOTED_DONATION');
				this.model.key_text16 = item16[lang_code];
			let item17 = res.find(i => i.key_text === 'YOUR_PENDING_REQUEST');
				this.model.key_text17 = item17[lang_code];
			let item18 = res.find(i => i.key_text === 'YOUR_ALLOTED_REQUEST');
				this.model.key_text18 = item18[lang_code];
			let item19 = res.find(i => i.key_text === 'AS_A_RECEIVER');
				this.model.key_text19 = item19[lang_code];
			let item20 = res.find(i => i.key_text === 'AS_A_DONAR');
				this.model.key_text20 = item20[lang_code];				
			
		//});
	
	this.weekly_donation_graph();
	this.weekly_pieChart();
  }
  ionViewDidEnter(){
	  
	//$('.receivertab').hide();
	 
		
  }
  handleTab(id){
	  if(id == 1){
		this.model.receivertab = 1;
		this.model.donartab = 0;
		  $('.rec').addClass('btn1 active');
		  $('.rec').css('border','1px solid #419B95');
		  $('.donar').removeClass('btn1 active');
		  $('.donar').css('border','none');
	  }
	  else{
		this.model.receivertab = 0;
	this.model.donartab = 1;
		$('.rec').removeClass('btn1 active');
		$('.rec').css('border','none');
		$('.donar').css('border','1px solid #419B95');
		$('.donar').addClass('btn1 active');
		
	  }
  }
  share(message){
	  
	document.addEventListener("deviceready", function() {
		window.plugins.socialsharing.share(message,'Khana app','','http://15.206.48.179/admin/login');
	}, false);	
}
  call(number){
	
	let data = JSON.stringify({'caller_id':this.model.user_id,'callee_mobile_no':number  });
			$('#add_location_spinner').show();
				this.fetch.add_call_detail(data).subscribe(res => {
					this.callNumber.callNumber("08069010223", true)
					.then(res => { $('#add_location_spinner').show(); console.log('Launched dialer!', res); })
					.catch(err => console.log('Error launching dialer', err));
				});
 }
  
  async cancelAllotedRequest(id,food_id,donar_id,no_of_person,food_type) {
	  
    const modal = await this.modalController.create({
		component: CancelAllotedfoodPage,
		cssClass: 'custom_filter_modal',
		componentProps: {
			"paramID": 123,
			"paramTitle": "Test Title",
			"id" : id
		}
    });

    modal.onDidDismiss().then((dataReturned) => {
		
		if (dataReturned !== null) {
			this.dataReturned = dataReturned.data;
			if(this.dataReturned == 1){
				let data = JSON.stringify({'food_id':food_id,'logged_in_user':this.model.login_username, 'no_of_person':no_of_person, 'app_user_id' : this.model.user_id, 'food_type' : food_type, 'notification_type' : 3, 'to' : donar_id, 'from' : this.model.user_id, 'getFoodId' : id  });
			//console.log(data);
				this.fetch.notify_donar(data).subscribe(res => {
						// this.router.navigate(['/home']);
						localStorage.setItem('isReceiverTab','1');
						this.ngOnInit();
						//this.ionViewDidEnter();
				});
				
			}

			//alert('Modal Sent Data :'+ dataReturned);
		}
    });

    return await modal.present();
  }
  async presentAlertPrompt(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class custom_alert_1',
	  header: 'Alert',
	  message: 'Are you sure want to cancel this donation!',
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
            
			
			
				//$("#req_list_"+id).hide();
				let data = JSON.stringify({'donate_food_id' : id});
				this.fetch.cancel_donation_food(data).subscribe(res => {
					console.log(res);
					localStorage.setItem('isReceiverTab','0');
					this.ngOnInit();
					//this.ionViewDidEnter();
				});
			
			
          }
        }
      ]
    });

    await alert.present();
  }
  async cancelRequestFood(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
	  header: 'Alert',
	  message: 'Are you sure want to cancel this request!',
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
            
			
			
				//$("#req_list_"+id).hide();
				let data = JSON.stringify({'id' : id});
				this.fetch.cancel_requested_food(data).subscribe(res => {
					console.log(res);
					localStorage.setItem('isReceiverTab','1');
					this.ngOnInit();
					//this.ionViewDidEnter();
				});
			
			
          }
        }
      ]
    });
	
    await alert.present();
  }
  activeDonation(id){
	let data = JSON.stringify({'id' : id});
	this.fetch.active_donation(data).subscribe(res => {
		this.ngOnInit();
		//this.ionViewDidEnter();
	});
  }
  async cancelAllotedFood(id,donate_food_id,donar_id,receiver_id,no_of_person) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
	  header: 'Alert',
	  message: 'Are you sure want to cancel this alloted donation!',
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
            
			
			
				//$("#req_list_"+id).hide();
				
				let data = JSON.stringify({'id' : id,'donate_food_id':donate_food_id, 'donar_id':donar_id,'receiver_id':receiver_id,'notification_type':4,'logged_in_username':this.model.login_username,'no_of_person':no_of_person});
				this.fetch.cancel_alloted_food(data).subscribe(res => {
					console.log(res);
					localStorage.setItem('isReceiverTab','0');
					this.ngOnInit();
					//this.ionViewDidEnter();
				});
			
			
          }
        }
      ]
    });

    await alert.present();
  }
  
  async presentAlert() {
	const alert = await this.alertController.create({
		cssClass: 'my-custom-class',
		header: 'Alert',
		message: 'Please fill all the details',
		buttons: ['Okay']
	});
	await alert.present();
  }
  plotSimpleBarChart(data, cat, min, max, tickInterval) {
	console.log(data);
	let myChart = HighCharts.chart('highcharts', {
		chart: {
			type: 'spline',
			backgroundColor: '#F7F6F4',
			height: 200,
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
			name: '',
			type: undefined,
			color: '#419B95',
			data: data
        }]
    });
	setTimeout(function(){ myChart.reflow(); }, 1000);
  }
  weekly_donation_graph(){
	setTimeout(function(){ 
		$('#activity_normal_spinner').css('display', 'none');
		$('#activity_normal_content').css('display', 'block');
	}, 100);
	this.donation_graph_data = [];
	this.fetch.weekly_donation_graph(this.model.user_id).subscribe(res => {
		for(var i = 0; i < 7; i++){
			this.donation_graph_data.push(0);
		}
		let calcmax = 12;
		for(var j = 0; j < res.data.length; j++){
			var index = res.data[j].day
			this.donation_graph_data[index] = res.data[j].cnt;
			if(res.data[j].cnt > calcmax){
				calcmax = res.data[j].cnt;
			}
		}
		this.model.xcat = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
		this.model.min = 0;
		this.model.max = calcmax;
		this.model.tickInterval = 4;
		this.plotSimpleBarChart(this.donation_graph_data, this.model.xcat, this.model.min, this.model.max, this.model.tickInterval);
	});  
	this.fetch.blessings_this_week(this.model.user_id).subscribe(res => {
		this.model.blessing_this_week = res.data[0].total_donation;
		this.model.blessing_quote = "week";
	});
	this.fetch.total_blessings(this.model.user_id).subscribe(res => {
		this.model.total_blessings = res.data[0].total_donation;
	});
  }
  monthly_donation_graph(){
	setTimeout(function(){ 
		$('#activity_normal_spinner').css('display', 'none');
		$('#activity_normal_content').css('display', 'block');
	}, 100);
	this.donation_graph_data = [];
	this.fetch.monthly_donation_graph(this.model.user_id).subscribe(res => {
		this.donation_graph_data = [0,0,0,0];
		for(var j = 0; j < res.data.length; j++){
			var index = res.data[j].Week_no - 1;
			this.donation_graph_data[index] = res.data[j].cnt;
		}
		this.model.xcat = ['Week1', 'Week2', 'Week3', 'Week4'];
		this.model.min = 0;
		this.model.max = 60;
		this.model.tickInterval = 20;
		this.plotSimpleBarChart(this.donation_graph_data, this.model.xcat, this.model.min, this.model.max, this.model.tickInterval);
	});  
	this.fetch.blessings_this_month(this.model.user_id).subscribe(res => {
		this.model.blessing_this_week = res.data[0].total_donation;
		this.model.blessing_quote = "month";
	});
	this.fetch.total_blessings(this.model.user_id).subscribe(res => {
		this.model.total_blessings = res.data[0].total_donation;
	});
  }

  pie_chart_food_quality(e, g, b){
	console.log(e+", "+g+", "+b);
	let myChart = HighCharts.chart('food_quality', {
		chart: {
			type: 'pie',
			backgroundColor: '#F7F6F4',
			plotBackgroundColor: '#F7F6F4',
			plotBorderWidth: null,
			plotShadow: false,
			height:300
		},
		credits: {
			enabled: false
		},
		title: {
			text: 'Food Quality'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %'
				}
			}
		},
		series: [{
			name: '',
			type: undefined,
			data: [{
				name: 'Excellent',
				y: e,
				color: "#32CD32"
			}, {
				name: 'Good',
				y: g,
				color: "orange"
			}, {
				name: 'Bad',
				y: b,
				color: "red"
			}]
		}]
	});
	setTimeout(function(){ myChart.reflow(); }, 1000);
  }
  packagingPieChart(e, g, b) {
   let myChart = HighCharts.chart('packaging', {
      chart: {
        type: 'pie',
		backgroundColor: '#F7F6F4',
		plotBackgroundColor: '#F7F6F4',
		plotBorderWidth: null,
		plotShadow: false,
		height:300
      },
	  title: {
        text: 'Packaging'
      },
	 credits: {
			enabled: false
		},
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: '',
		type: undefined,
        data: [{
          name: 'Excellent',
          y: e,
		  color: "#32CD32"
        }, {
          name: 'Good',
          y: g,
		   color: "orange"
        }, {
          name: 'Bad',
          y: b,
		   color: "red"
        }]
      }]
    });
	setTimeout(function(){ myChart.reflow(); }, 1000);
  }
  behaviourPieChart(e, g, b) {
let myChart = HighCharts.chart('behaviour', {
      chart: {
        type: 'pie',
		backgroundColor: '#F7F6F4',
		plotBackgroundColor: '#F7F6F4',
		plotBorderWidth: null,
		plotShadow: false,
		height:300
      },
	  title: {
        text: 'Behaviour'
      },
	 credits: {
			enabled: false
		},
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: '',
		type: undefined,
        data: [{
          name: 'Excellent',
          y: e,
		  color: "#32CD32"
        }, {
          name: 'Good',
          y: g,
		   color: "orange"
        }, {
          name: 'Bad',
          y: b,
		   color: "red"
        }]
      }]
    });
	setTimeout(function(){ myChart.reflow(); }, 1000);
  }
 
  state(){
	
		$('#activity_normal_content').css('display', 'none');
		$('#activity_normal_spinner').css('display', 'block');
	
	console.log($('input[name=switch-one]:checked', '#myForm').val());
	if($('input[name=switch-one]:checked', '#myForm').val() == "no"){
		$('#u_week_blessing_div').css('display', 'none');
		$('#u_month_blessing_div').css('display', 'block');
		this.monthly_donation_graph();
		this.monthly_pieChart();
	}else if($('input[name=switch-one]:checked', '#myForm').val() == "yes"){
		$('#u_month_blessing_div').css('display', 'none');
		$('#u_week_blessing_div').css('display', 'block');
		this.weekly_donation_graph();
		this.weekly_pieChart();
	}
  }
  
   weekly_pieChart(){
	setTimeout(function(){ 
		$('#activity_normal_spinner').css('display', 'none');
		$('#activity_normal_content').css('display', 'block');
	}, 100);
	this.fetch.food_quality_weekly(this.model.user_id).subscribe(res => {
		this.model.excellent_cnt = res['excellent']['cnt'];
		this.model.good_cnt = res.good.cnt;
		this.model.bad_cnt = res.bad.cnt;
		if(this.model.excellent_cnt > this.model.good_cnt && this.model.excellent_cnt > this.model.bad_cnt){
			this.model.quality_rating = "Excellent";
		}else if(this.model.good_cnt > this.model.excellent_cnt && this.model.good_cnt > this.model.bad_cnt){
			this.model.quality_rating = "Good";
		}else if(this.model.bad_cnt > this.model.excellent_cnt && this.model.bad_cnt > this.model.good_cnt){
			this.model.quality_rating = "Bad";
		}
		this.pie_chart_food_quality(this.model.excellent_cnt, this.model.good_cnt, this.model.bad_cnt);
	});
	this.fetch.weekly_packaging(this.model.user_id).subscribe(res => {
		this.model.excellent_cnt = res['excellent']['cnt'];
		this.model.good_cnt = res.good.cnt;
		this.model.bad_cnt = res.bad.cnt;
		if(this.model.excellent_cnt > this.model.good_cnt && this.model.excellent_cnt > this.model.bad_cnt){
			this.model.packaging_rating = "Excellent";
		}else if(this.model.good_cnt > this.model.excellent_cnt && this.model.good_cnt > this.model.bad_cnt){
			this.model.packaging_rating = "Good";
		}else if(this.model.bad_cnt > this.model.excellent_cnt && this.model.bad_cnt > this.model.good_cnt){
			this.model.packaging_rating = "Bad";
		}
		this.packagingPieChart(this.model.excellent_cnt, this.model.good_cnt, this.model.bad_cnt);
	});
	this.fetch.weekly_behaviour(this.model.user_id).subscribe(res => {
		this.model.excellent_cnt = res['excellent']['cnt'];
		this.model.good_cnt = res.good.cnt;
		this.model.bad_cnt = res.bad.cnt;
		if(this.model.excellent_cnt > this.model.good_cnt && this.model.excellent_cnt > this.model.bad_cnt){
			this.model.behaviour_rating = "Excellent";
		}else if(this.model.good_cnt > this.model.excellent_cnt && this.model.good_cnt > this.model.bad_cnt){
			this.model.behaviour_rating = "Good";
		}else if(this.model.bad_cnt > this.model.excellent_cnt && this.model.bad_cnt > this.model.good_cnt){
			this.model.behaviour_rating = "Bad";
		}
		this.behaviourPieChart(this.model.excellent_cnt, this.model.good_cnt, this.model.bad_cnt);
	});  
  }
  
  monthly_pieChart(){
	setTimeout(function(){ 
		$('#activity_normal_spinner').css('display', 'none');
		$('#activity_normal_content').css('display', 'block');
	}, 100);
	this.fetch.monthly_food_quality(this.model.user_id).subscribe(res => {
		this.model.excellent_cnt = res['excellent']['cnt'];
		this.model.good_cnt = res.good.cnt;
		this.model.bad_cnt = res.bad.cnt;
		if(this.model.excellent_cnt > this.model.good_cnt && this.model.excellent_cnt > this.model.bad_cnt){
			this.model.quality_rating = "Excellent";
		}else if(this.model.good_cnt > this.model.excellent_cnt && this.model.good_cnt > this.model.bad_cnt){
			this.model.quality_rating = "Good";
		}else if(this.model.bad_cnt > this.model.excellent_cnt && this.model.bad_cnt > this.model.good_cnt){
			this.model.quality_rating = "Bad";
		}
		this.pie_chart_food_quality(this.model.excellent_cnt, this.model.good_cnt, this.model.bad_cnt);
	});
	this.fetch.monthly_packaging(this.model.user_id).subscribe(res => {
		this.model.excellent_cnt = res['excellent']['cnt'];
		this.model.good_cnt = res.good.cnt;
		this.model.bad_cnt = res.bad.cnt;
		if(this.model.excellent_cnt > this.model.good_cnt && this.model.excellent_cnt > this.model.bad_cnt){
			this.model.packaging_rating = "Excellent";
		}else if(this.model.good_cnt > this.model.excellent_cnt && this.model.good_cnt > this.model.bad_cnt){
			this.model.packaging_rating = "Good";
		}else if(this.model.bad_cnt > this.model.excellent_cnt && this.model.bad_cnt > this.model.good_cnt){
			this.model.packaging_rating = "Bad";
		}
		this.packagingPieChart(this.model.excellent_cnt, this.model.good_cnt, this.model.bad_cnt);
	});
	this.fetch.monthly_behaviour(this.model.user_id).subscribe(res => {
		this.model.excellent_cnt = res['excellent']['cnt'];
		this.model.good_cnt = res.good.cnt;
		this.model.bad_cnt = res.bad.cnt;
		if(this.model.excellent_cnt > this.model.good_cnt && this.model.excellent_cnt > this.model.bad_cnt){
			this.model.behaviour_rating = "Excellent";
		}else if(this.model.good_cnt > this.model.excellent_cnt && this.model.good_cnt > this.model.bad_cnt){
			this.model.behaviour_rating = "Good";
		}else if(this.model.bad_cnt > this.model.excellent_cnt && this.model.bad_cnt > this.model.good_cnt){
			this.model.behaviour_rating = "Bad";
		}
		this.behaviourPieChart(this.model.excellent_cnt, this.model.good_cnt, this.model.bad_cnt);
	});   
  }
   

}
