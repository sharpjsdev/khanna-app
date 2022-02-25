import { Component, OnInit,Input  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from '../../fetch.service';
import { StorageService } from '../../storage.service';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';

@Component({
  selector: 'app-success-deliver-modal',
  templateUrl: './success-deliver-modal.page.html',
  styleUrls: ['./success-deliver-modal.page.scss'],
})
export class SuccessDeliverModalPage implements OnInit {
  @Input() id;
  @Input() data;
  model:any={};
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private router: Router,
    private fetch: FetchService,
    private storage: StorageService,
  ) { }

  ngOnInit() {
    var lang_code = JSON.parse(localStorage.getItem('lang'));
    let res = this.storage.getScope();
    let item1 = res.find(i => i.key_text === 'THANKYOU_FOR_YOUR_DONATION');
    this.model.key_text1 = item1[lang_code];
    let item2 = res.find(i => i.key_text === 'DONATION_SUCCESS_MSG_1');
    this.model.key_text2 = item2[lang_code];
    let item3 = res.find(i => i.key_text === 'DONATION_SUCCESS_MSG_2');
    this.model.key_text3 = item3[lang_code];
    let item4 = res.find(i => i.key_text === 'DONATION_SUCCESS_FOOTER_MSG');
    this.model.key_text4 = item4[lang_code];
    let item5 = res.find(i => i.key_text === 'GIVE_FEEDBACK');
    this.model.key_text5 = item5[lang_code];
  }
  async redirectToNext(){
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
    this.router.navigate(['/feedback-form-for-donor',this.data,this.id]);
  }
}
