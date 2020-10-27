import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as HighCharts from 'highcharts';

declare var $:any;

@Component({
  selector: 'app-activity-normal',
  templateUrl: './activity-normal.page.html',
  styleUrls: ['./activity-normal.page.scss'],
})
export class ActivityNormalPage implements OnInit {
model:any={};
donation_graph_data:any=[];
blessing_this_week:any=[];
pending_data:any=[];
  constructor(
	private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
  ) { }

  ngOnInit() {
	setTimeout(function(){ 
		$('#activity_normal_spinner').css('display', 'none');
		$('#activity_normal_content').css('display', 'block');
	}, 5000);
	this.model.user_id = JSON.parse(localStorage.getItem('user_registerd'));
	console.log(this.model.user_id);
	this.fetch.get_user_city(this.model.user_id).subscribe(res => {
		//console.log(res.data['city']);
		this.fetch.get_top_donors(res.data['city']).subscribe(res2 => {
			//console.log(res2);
			this.model.top_donors = res2.data;
		});
	});
	this.fetch.show_feedback().subscribe(res => {
		//console.log(res);
		this.model.feedback_data = res.data;
	});
	this.fetch.pending_donation(this.model.user_id).subscribe(res => {
		console.log(res);
		this.pending_data = res['data'];
	});
	this.weekly_donation_graph();
	this.weekly_pieChart();
  }
  
  plotSimpleBarChart(data, cat, min, max, tickInterval) {
	console.log(data);
	let myChart = HighCharts.chart('highcharts', {
		chart: {
			height: 200,
			type: 'spline',
			backgroundColor: '#F7F6F4',
			events: {
				redraw: function(e) {
					myChart.reflow();
				}
			}
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
	}, 5000);
	this.donation_graph_data = [];
	this.fetch.weekly_donation_graph(this.model.user_id).subscribe(res => {
		for(var i = 0; i < 7; i++){
			this.donation_graph_data.push(0);
		}
		for(var j = 0; j < res.data.length; j++){
			var index = res.data[j].day
			this.donation_graph_data[index] = res.data[j].cnt;
		}
		this.model.xcat = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
		this.model.min = 0;
		this.model.max = 12;
		this.model.tickInterval = 4;
		this.plotSimpleBarChart(this.donation_graph_data, this.model.xcat, this.model.min, this.model.max, this.model.tickInterval);
	});  
	this.fetch.blessings_this_week(this.model.user_id).subscribe(res => {
		console.log(res);
		this.model.blessing_this_week = res.data[0].total_donation;
		this.model.blessing_quote = "week";
	});
	this.fetch.total_blessings(this.model.user_id).subscribe(res => {
		console.log(res);
		this.model.total_blessings = res.data[0].total_donation;
	});
  }
  monthly_donation_graph(){
	setTimeout(function(){ 
		$('#activity_normal_spinner').css('display', 'none');
		$('#activity_normal_content').css('display', 'block');
	}, 5000);
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
		console.log(res);
		this.model.blessing_this_week = res.data[0].total_donation;
		this.model.blessing_quote = "month";
	});
	this.fetch.total_blessings(this.model.user_id).subscribe(res => {
		console.log(res);
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
			height:200
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
		height:200
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
		height:200
      },
	  title: {
        text: 'behaviour'
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
		this.monthly_donation_graph();
		this.monthly_pieChart();
	}else if($('input[name=switch-one]:checked', '#myForm').val() == "yes"){
		this.weekly_donation_graph();
		this.weekly_pieChart();
	}
  }
  
   weekly_pieChart(){
	setTimeout(function(){ 
		$('#activity_normal_spinner').css('display', 'none');
		$('#activity_normal_content').css('display', 'block');
	}, 5000);
	this.fetch.food_quality_weekly(this.model.user_id).subscribe(res => {
		console.log(res);
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
		console.log(res);
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
		console.log(res);
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
	}, 5000);
	this.fetch.monthly_food_quality(this.model.user_id).subscribe(res => {
		console.log(res);
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
		console.log(res);
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
		console.log(res);
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
