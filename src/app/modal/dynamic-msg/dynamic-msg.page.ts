import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StorageService } from '../../storage.service';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';

@Component({
  selector: 'app-dynamic-msg',
  templateUrl: './dynamic-msg.page.html',
  styleUrls: ['./dynamic-msg.page.scss'],
})
export class DynamicMsgPage implements OnInit {
  @Input() msg;
  model:any={};
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
	  private router: Router,
    private storage: StorageService
  ) { }

  ngOnInit() {
    this.model.key_text1 = "okay";
    var lang_code = JSON.parse(localStorage.getItem('lang'));
		let res = this.storage.getScope();
    let item1 = res.find(i => i.key_text === 'OKAY');
			this.model.key_text1 = item1[lang_code];
  }
  async closeModal(){
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}
