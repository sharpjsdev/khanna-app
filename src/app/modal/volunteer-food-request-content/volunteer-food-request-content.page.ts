import { Component, OnInit , Input } from '@angular/core';
import { Router, ParamMap } from '@angular/router';
import { StorageService } from '../../storage.service';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';

@Component({
  selector: 'app-volunteer-food-request-content',
  templateUrl: './volunteer-food-request-content.page.html',
  styleUrls: ['./volunteer-food-request-content.page.scss'],
})
export class VolunteerFoodRequestContentPage implements OnInit {
  @Input() request_data;
  model:any={};
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private router: Router,
    private storage: StorageService,
  ) { }

  ngOnInit() {
    console.log(this.request_data);
    var lang_code = JSON.parse(localStorage.getItem('lang'));
  
    //this.fetch.getKeyText(lang_code).subscribe(res => {
        let res = this.storage.getScope();
        let item1 = res.find(i => i.key_text === 'DEAR');
        this.model.key_text1 = item1[lang_code];
        let item2 = res.find(i => i.key_text === 'VOLUNTEER_FOOD_REQUEST_ADD_MSG');
        this.model.key_text2 = item2[lang_code];
        let item3 = res.find(i => i.key_text === 'PERSON');
        this.model.key_text3 = item3[lang_code];
        let item4 = res.find(i => i.key_text === 'VOLUNTEER');
        this.model.key_text4 = item4[lang_code];
        let item5 = res.find(i => i.key_text === 'VOLUNTEER_MSG');
        this.model.key_text5 = item5[lang_code];
        let item6 = res.find(i => i.key_text === 'VOLUNTEER_MSG_1');
        this.model.key_text6 = item6[lang_code];
  }
  

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
	this.router.navigate(['/volunteer-detail']);
  }
}
