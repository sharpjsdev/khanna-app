import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';
import * as HighCharts from 'highcharts';

declare var $ : any;

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
model:any={};
volunteer_graph_data:any=[];
  constructor(
	private fetch: FetchService
  ) { }

  ngOnInit() {
	this.model.volunteer_id = JSON.parse(localStorage.getItem('volunteer_id'));
	this.fetch.volunteer_city(this.model.volunteer_id).subscribe(res => {
		console.log(res.data['city']);
		this.fetch.top_volunteers(res.data['city']).subscribe(res2 => {
			console.log(res2);
			this.model.top_volunteers = res2.data;
		});
	});
	this.weekly_volunteer_graph();
  }
  plotSimpleBarChart(data, cat, min, max, tickInterval) {
	console.log(data);
	let myChart = HighCharts.chart('highcharts_v', {
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
  weekly_volunteer_graph(){
	setTimeout(function(){ 
		$('#volunteer_activity_spinner').css('display', 'none');
		$('#volunteer_activity_content').css('display', 'block');
	}, 5000);
	this.volunteer_graph_data = [];
	console.log(this.model.volunteer_id);
	this.fetch.weekly_volunteer_req(this.model.volunteer_id).subscribe(res => {
		console.log(res);
		for(var i = 0; i < 7; i++){
			this.volunteer_graph_data.push(0);
		}
		console.log(this.volunteer_graph_data);
		for(var j = 0; j < res.data.length; j++){
			//this.volunteer_graph_data[](res.data[j].day, 0, res.data[j].cnt);
			var index = res.data[j].day
			this.volunteer_graph_data[index] = res.data[j].cnt;
		}
		console.log(this.volunteer_graph_data);
		this.model.xcat = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
		this.model.min = 0;
		this.model.max = 12;
		this.model.tickInterval = 4;
		this.plotSimpleBarChart(this.volunteer_graph_data, this.model.xcat, this.model.min, this.model.max, this.model.tickInterval);
	});
	this.fetch.volunteer_blessings_this_week(this.model.volunteer_id).subscribe(res => {
		console.log(res);
		this.model.blessing_this_week = res.data[0].total_donation;
		this.model.blessing_quote = "week";
	});
	this.fetch.volunteer_total_blessings(this.model.volunteer_id).subscribe(res => {
		console.log(res);
		this.model.total_blessings = res.data[0].total_donation;
	});
  }
  monthly_donation_graph(){
	setTimeout(function(){ 
		$('#volunteer_activity_spinner').css('display', 'none');
		$('#volunteer_activity_content').css('display', 'block');
	}, 5000);
	this.volunteer_graph_data = [];
	this.fetch.monthly_volunteer_req(this.model.volunteer_id).subscribe(res => {
		console.log(res.data);
		this.volunteer_graph_data = [0,0,0,0];
		for(var j = 0; j < res.data.length; j++){
			//this.volunteer_graph_data.splice(res.data[j].Week_no, 0, res.data[j].cnt);
			var index = res.data[j].Week_no - 1;
			this.volunteer_graph_data[index] = res.data[j].cnt;
		}
		this.model.xcat = ['Week1', 'Week2', 'Week3', 'Week4'];
		this.model.min = 0;
		this.model.max = 60;
		this.model.tickInterval = 20;
		this.plotSimpleBarChart(this.volunteer_graph_data, this.model.xcat, this.model.min, this.model.max, this.model.tickInterval);
	});  
	this.fetch.volunteer_blessings_this_month(this.model.volunteer_id).subscribe(res => {
		console.log(res);
		this.model.blessing_this_week = res.data[0].total_donation;
		this.model.blessing_quote = "month";
	});
	this.fetch.volunteer_total_blessings(this.model.volunteer_id).subscribe(res => {
		console.log(res);
		this.model.total_blessings = res.data[0].total_donation;
	});
  }
  
  state(){
	$('#volunteer_activity_spinner').css('display', 'block');
	$('#volunteer_activity_content').css('display', 'none');
	console.log($('input[name=switch-one]:checked', '#volunteer_form').val());
	if($('input[name=switch-one]:checked', '#volunteer_form').val() == "no"){
		this.monthly_donation_graph();
	}else if($('input[name=switch-one]:checked', '#volunteer_form').val() == "yes"){
		this.weekly_volunteer_graph();
	}
  }
  

}
