import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from '../../fetch.service';
import { StorageService } from '../../storage.service';
import { RejectGetFoodRequestPage } from '../reject-get-food-request/reject-get-food-request.page';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';

@Component({
  selector: 'app-onthe-way-msg',
  templateUrl: './onthe-way-msg.page.html',
  styleUrls: ['./onthe-way-msg.page.scss'],
})
export class OntheWayMsgPage implements OnInit {
  model:any={};
  @Input() type;
  @Input() r_id;
  @Input() way;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
	  private router: Router,
	  private fetch: FetchService,
    private storage: StorageService
  ) { }

  ngOnInit() {
    console.log(this.way);
    if(this.type == 'ontheway'){
      this.model.type_id = 1;
    }else{
      this.model.type_id = 0;
    }
    var lang_code = JSON.parse(localStorage.getItem('lang'));
		let res = this.storage.getScope();
		let item1 = res.find(i => i.key_text === 'NO_DONOR_MSG_1');
			this.model.key_text1 = item1[lang_code];
    let item2 = res.find(i => i.key_text === 'NO_DONOR_MSG_2');
			this.model.key_text2 = item2[lang_code];
    let item3 = res.find(i => i.key_text === 'OKAY');
			this.model.key_text3 = item3[lang_code];
  }
  async redirectToNext(){
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
    this.openModel();
    
  }
  async closeModal(){
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
    this.router.navigate(['/home']);
  }
	async openModel() {
		const modal = await this.modalController.create({
		component: RejectGetFoodRequestPage,
		cssClass: 'custom_current_location_modal notification-modal',
		backdropDismiss : false,
		componentProps: {
			"data" : "",
			"r_data" : this.way,
			"app_id" : this.r_id,
			"type_id" : this.model.type_id
		}
		});  
		modal.onDidDismiss().then((dataReturned) => {
		
		});
	
		return await modal.present();
	  }  
}
