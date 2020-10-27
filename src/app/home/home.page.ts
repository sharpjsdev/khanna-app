import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeContentPage } from '../modal/home-content/home-content.page';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
model:any={};
  dataReturned: any;
  constructor(
    public modalController: ModalController,
	private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
	private platform: Platform
  ) { 
	this.platform.backButton.subscribeWithPriority(10, () => {
		this.router.navigate(['/home']);
	});
  }

  ngOnInit() { 
	this.model.key_text1 = "Those who are happiest are those";
	this.model.key_text2 = "who do the most for others.";
	this.model.key_text3 = "Get Food";
	this.model.key_text4 = "Donate Food";
	this.model.key_text5 = "Home";
	this.model.key_text6 = "Activity";
	this.model.key_text7 = "Volunteer";
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	this.fetch.getKeyText(lang_code).subscribe(res => {
		let item1 = res.find(i => i.key_text === 'THOSE_WHO_ARE_HAPPIEST_ARE_THOSE');
			this.model.key_text1 = item1[lang_code];
		let item2 = res.find(i => i.key_text === 'WHO_DO_THE_MOST_FOR_OTHERS.');
			this.model.key_text2 = item2[lang_code];
		let item3 = res.find(i => i.key_text === 'GET_FOOD');
			this.model.key_text3 = item3[lang_code];
		let item4 = res.find(i => i.key_text === 'DONATE_FOOD');
			this.model.key_text4 = item4[lang_code];
		let item5 = res.find(i => i.key_text === 'HOME');
			this.model.key_text5 = item5[lang_code];
		let item6 = res.find(i => i.key_text === 'ACTIVITY');
			this.model.key_text6 = item6[lang_code];
		let item7 = res.find(i => i.key_text === 'VOLUNTEER');
			this.model.key_text7 = item7[lang_code];
			
	});
  }

  async openModalHome() {
    const modal = await this.modalController.create({
		component: HomeContentPage,
		cssClass: 'custom_filter_modal',
		componentProps: {
			"paramID": 123,
			"paramTitle": "Test Title"
		}
    });

    modal.onDidDismiss().then((dataReturned) => {
		if (dataReturned !== null) {
			this.dataReturned = dataReturned.data;
			//alert('Modal Sent Data :'+ dataReturned);
		}
    });

    return await modal.present();
  }
  go_donate(){
	if(JSON.parse(localStorage.getItem('donor_location')) != null){
		localStorage.removeItem('donor_location');
	}
	this.router.navigate(['/donate-food']);
  }
  get_food_search(){
	if(JSON.parse(localStorage.getItem('get-food-search')) != null){
		localStorage.removeItem('get-food-search');
	}
	this.router.navigate(['/get-food-search']);  
  }

}
