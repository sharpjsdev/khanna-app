import { Component, OnInit,Input  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from '../../fetch.service';
import { StorageService } from '../../storage.service';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';

@Component({
  selector: 'app-deliver-food-volunteer',
  templateUrl: './deliver-food-volunteer.page.html',
  styleUrls: ['./deliver-food-volunteer.page.scss'],
})
export class DeliverFoodVolunteerPage implements OnInit {
  model:any={};
  @Input() array;
  details: any = {};
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private router: Router,
    private fetch: FetchService,
    private storage: StorageService,
  ) { }

  ngOnInit() {
    this.details =  JSON.stringify(this.array);
    var lang_code = JSON.parse(localStorage.getItem('lang'));
    let res = this.storage.getScope();
    let item1 = res.find(i => i.key_text === 'FOOD_REQUEST_COMPLETED_SUCCESSFULLY');
    this.model.key_text1 = item1[lang_code];
    let item2 = res.find(i => i.key_text === 'VOLUNTEER_SUCCESS_MSG');
    this.model.key_text2 = item2[lang_code];
    let item3 = res.find(i => i.key_text === 'DONATION_SUCCESS_MSG_2');
    this.model.key_text3 = item3[lang_code];
    let item4 = res.find(i => i.key_text === 'DONATION_SUCCESS_FOOTER_MSG');
    this.model.key_text4 = item4[lang_code];
    let item5 = res.find(i => i.key_text === 'SHARE_FEEDBACK');
    this.model.key_text5 = item5[lang_code];
  }
  async redirectToNext(){
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
    var t = JSON.parse(this.details);
    
    this.router.navigate(['/feedback-form',t.r_id,t.getFood_id]);
  }
  async closeModal(){
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
    this.router.navigate(['/home']);
  }  

}
