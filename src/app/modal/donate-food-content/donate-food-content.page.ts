import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from '../../fetch.service';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';

@Component({
  selector: 'app-donate-food-content',
  templateUrl: './donate-food-content.page.html',
  styleUrls: ['./donate-food-content.page.scss'],
})
export class DonateFoodContentPage implements OnInit {
model:any={};
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
	private router: Router,
	private fetch: FetchService
  ) { }

  ngOnInit() { 
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	this.fetch.getKeyText(lang_code).subscribe(res => {
		let item1 = res.find(i => i.key_text === 'THANK_YOU_FOR_YOUR_KIND_GESTURE');
			this.model.key_text1 = item1[lang_code]; 
		let item2 = res.find(i => i.key_text === 'END_DONATION_MSG');
			this.model.key_text2= item2[lang_code]; 
			
	});
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
	this.router.navigate(['/home']);
  }

} 
