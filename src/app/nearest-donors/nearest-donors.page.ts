import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterContentPage } from '../modal/otp/filter-content/filter-content.page';
import { SortContentPage } from '../modal/sort-content/sort-content.page';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

declare var $:any;

@Component({
  selector: 'app-nearest-donors',
  templateUrl: './nearest-donors.page.html',
  styleUrls: ['./nearest-donors.page.scss'],
})
export class NearestDonorsPage implements OnInit {
	@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
	dataReturned: any;
model:any={};
  constructor(
    public modalController: ModalController,
	private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
	public alertController: AlertController
  ) { } 

  ngOnInit() { 
	
  }
  ionViewWillEnter(){
	this.model.is_volunteer = 0;
	if(localStorage.getItem('volunteer_approve') != null){
		this.model.is_volunteer = localStorage.getItem('volunteer_approve');
	}  
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	console.log(lang_code);
	this.fetch.getKeyText(lang_code).subscribe(res => {
		let item1 = res.find(i => i.key_text === 'NEAREST_FOOD_DONORS');
			this.model.key_text1 = item1[lang_code];
		let item2 = res.find(i => i.key_text === 'SORT');
			this.model.key_text2 = item2[lang_code];
		let item3 = res.find(i => i.key_text === 'FILTER');
			this.model.key_text3 = item3[lang_code];
		let item5 = res.find(i => i.key_text === 'COLLECT_FOOD');
			this.model.key_text5 = item5[lang_code];
		let item6 = res.find(i => i.key_text === 'WALK');
			this.model.key_text6 = item6[lang_code];
		let item7 = res.find(i => i.key_text === 'TWO-WHEELER');
			this.model.key_text7 = item7[lang_code];
		let item8 = res.find(i => i.key_text === 'PUBLIC_TRANSPORT');
			this.model.key_text8 = item8[lang_code];
		let item9 = res.find(i => i.key_text === 'HOME');
			this.model.key_text9 = item9[lang_code];
		let item10 = res.find(i => i.key_text === 'ACTIVITY');
			this.model.key_text10 = item10[lang_code];
		let item11 = res.find(i => i.key_text === 'VOLUNTEER');
			this.model.key_text11 = item11[lang_code];
		let item12 = res.find(i => i.key_text === 'NO_DONOR');
			this.model.key_text12 = item12[lang_code];
		let item13 = res.find(i => i.key_text === 'OKAY');
		this.model.key_text13 = item13[lang_code];
	}); 
	var id = this.route.snapshot.params['id'];
	this.model.receiver_id = this.route.snapshot.params['id'];
	this.fetch.receiver_details(id).subscribe(res => {
		this.model.city = res['data'].city;
		this.model.colony_name = res['data'].colony_name;
		this.model.receiver_lat = res['data'].latitude;
		this.model.receiver_lon = res['data'].longitude;
		this.model.food_type = res['data'].food_type;
		this.model.no_of_person = res['data'].no_of_person;
		var i  = $('#start_page').val();
		this.model.receiver_data = JSON.stringify({'latitude': this.model.receiver_lat, 'longitude' : this.model.receiver_lon, 'city' : res['data'].city, 'food_type' : res['data'].food_type, 'needed_person' : res['data'].no_of_person, 'skip' : i});
		console.log(this.model.receiver_data);
		this.fetch.nearest_donors(this.model.receiver_data).subscribe(response => {
			$('#nearest_donors_spinner').css('display', 'none');
			$('#nearest_donors_list').css('display', 'block');
			console.log(response['data']);
			if(response['data'].length == 0){
				this.presentAlert();
			}
			this.model.donor_data = response['data'];
		});
	}); 
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: FilterContentPage,
      cssClass: 'custom_filter_modal',
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
       if (dataReturned !== null) {
		
        this.dataReturned = dataReturned.data;
        console.log('Modal Sent Data :'+ JSON.stringify(this.dataReturned));
		if(this.dataReturned != "close"){
			$('#nearest_donors_spinner').css('display', 'block');
			$('#nearest_donors_list').css('display', 'none');
			this.model.food_type = this.dataReturned.filter_food_type;
			this.model.no_of_person = this.dataReturned.filter_no_of_person;
			this.model.receiver_data = JSON.stringify({'latitude': this.model.receiver_lat, 'longitude' : this.model.receiver_lon, 'city' : this.model.city, 'food_type' : this.model.food_type, 'needed_person' : this.model.no_of_person, 'skip' : 0});
			this.fetch.nearest_donors(this.model.receiver_data).subscribe(response => {
				/* var self = this;
				 response['data'].forEach(function (i, val) {
					var x = self.distace(self.model.receiver_lat, self.model.receiver_lon, i.latitude ,i.longitude);
					response['data'][val]['times'] = x;
				}); */
				$('#nearest_donors_spinner').css('display', 'none');
				$('#nearest_donors_list').css('display', 'block');
				console.log(response['data']);
				this.model.donor_data = response['data'];
			});
		}
      } 
    });
    return await modal.present();
  }




  async openModalSort() {
    const modal = await this.modalController.create({
		component: SortContentPage,
		cssClass: 'custom_filter_modal',
		componentProps: {
			"paramID": 123,
			"paramTitle": "Test Title" 
		}
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {

        this.dataReturned = dataReturned.data;
		console.log('Modal Sent Data :'+ JSON.stringify(this.dataReturned));
		if(this.dataReturned != "close"){
			$('#nearest_donors_spinner').css('display', 'block');
			$('#nearest_donors_list').css('display', 'none');
			if(this.dataReturned.distance != null){
				//console.log(this.dataReturned.distance);
				//this.model.donor_data.sort();
				$('#nearest_donors_spinner').css('display', 'none');
				$('#nearest_donors_list').css('display', 'block');
				this.model.donor_data.sort((a: any, b: any) => {
					const d1 = a.time_distance_transit.rows[0].elements[0].distance.text[0] as any;
					const d2 = b.time_distance_transit.rows[0].elements[0].distance.text[0] as any;
					console.log(d1 - d2);
					return(d1 - d2);
				});
				console.log(this.model.donor_data);
			}
			if(this.dataReturned.time != null){
				$('#nearest_donors_spinner').css('display', 'none');
				$('#nearest_donors_list').css('display', 'block');
				this.model.donor_data.sort((a: any, b: any) => {
					const d1 = a.time_distance_transit.rows[0].elements[0].duration.text[0] as any;
					const d2 = b.time_distance_transit.rows[0].elements[0].duration.text[0] as any;
					console.log(d1 - d2);
					return(d1 - d2);
				});
				console.log(this.model.donor_data);
			}
		}
      }
    });

    return await modal.present();
  }
  collect_food(x){
	console.log(x);
	
	this.router.navigate(['/get-food-nearest-donors',JSON.stringify(x),this.model.receiver_lat,this.model.receiver_lon,this.model.receiver_id]);
  }
  loadData(event) {
	  var self = this;
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
		console.log(event);
      var i  = $('#start_page').val();
		var j  = 5 + parseInt(i);
		self.model.receiver_data = JSON.stringify({'latitude': self.model.receiver_lat, 'longitude' : self.model.receiver_lon, 'city' : self.model.city, 'food_type' : self.model.food_type, 'needed_person' : this.model.no_of_person, 'skip' : j});
		self.fetch.nearest_donors(self.model.receiver_data).subscribe(res => {
			console.log(res['data']);
			//self.model.donor_data.push(response['data']);
			/* res['data'].foreach((value, index) => {
				response['data'].push(value);
			}); */
			for(var i = 0; i < res['data'].length; i++){
				self.model.donor_data.push(res['data'][i]);
			}
		});
		$('#start_page').val(j);
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  async presentAlert() {
	  console.log(this.model.key_text12);
		const alert = await this.alertController.create({
		  cssClass: 'my-custom-class',
		  header: this.model.key_text12,
		  buttons: [this.model.key_text13]
		});

		await alert.present();
	  }


}
