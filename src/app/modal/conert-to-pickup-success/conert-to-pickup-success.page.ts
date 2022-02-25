import { Component, OnInit , Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from '../../fetch.service';
import { StorageService } from '../../storage.service';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';
@Component({
  selector: 'app-conert-to-pickup-success',
  templateUrl: './conert-to-pickup-success.page.html',
  styleUrls: ['./conert-to-pickup-success.page.scss'],
})
export class ConertToPickupSuccessPage implements OnInit {
  @Input() food;
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
    console.log(JSON.parse(localStorage.getItem('user_registerd')));
    this.model.user_id = JSON.parse(localStorage.getItem('user_registerd'));
    console.log(this.model.user_id);
    let data = JSON.stringify({'id': this.model.user_id});
    this.fetch.profile(data).subscribe(res => {
      this.model.username = res['username'];
    });

    let res = this.storage.getScope();
    let item1 = res.find(i => i.key_text === 'DEAR');
    this.model.key_text1 = item1[lang_code];
    let item2 = res.find(i => i.key_text === 'DONATE_MSG_5');
    this.model.key_text2 = item2[lang_code];
    let item3 = res.find(i => i.key_text === 'PERSON');
    this.model.key_text3 = item3[lang_code];
    let item4 = res.find(i => i.key_text === 'DONATE_MSG_3');
    this.model.key_text4 = item4[lang_code];
  }
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
	  this.router.navigate(['/home']);
  }
}
