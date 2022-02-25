import { Component, OnInit,Input } from '@angular/core';
import { FetchService } from '../../fetch.service';
import { StorageService } from '../../storage.service'; 
import { Router } from '@angular/router';
import { HomeContentPage } from './../home-content/home-content.page';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';
  declare var $:any;
@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.page.html',
  styleUrls: ['./terms-conditions.page.scss'],
})
export class TermsConditionsPage implements OnInit {
  @Input() content;
  @Input() paramTitle;
  model:any={};
  app_title:any;
  page_key1:any;
  page_key2:any;
  constructor(private modalController: ModalController,
    private navParams: NavParams,private storage:StorageService,private router : Router,
	private fetch: FetchService) { }

  ngOnInit() {
    this.app_title = 'Khanaa.app';
    this.page_key1 = 'Terms & Conditions';
    
    this.model.accept_btn = 'Accept';
    var lang_code = JSON.parse(localStorage.getItem('lang'));
    let res = this.storage.getScope();
    let item1 = res.find(i => i.key_text === 'KHANAA_APP');
      this.app_title = item1[lang_code];
    let item2 = res.find(i => i.key_text === 'TERMS_AND_CONDITIONS');
      this.page_key1 = item2[lang_code];	
    let item3 = res.find(i => i.key_text === 'ACCEPT');
      this.model.accept_btn = item3[lang_code];
    var lang_code = JSON.parse(localStorage.getItem('lang'));
  }
  async successFullRegistration() { 
    const modal = await this.modalController.create({
      component: HomeContentPage,
      cssClass: 'home_content_modal',
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    }); 

    modal.onDidDismiss().then((dataReturned) => {
		this.router.navigate(['/home']);
      if (dataReturned !== null) {
      }
    });

    return await modal.present();
  }
  async closeModal(data) {
      const onClosedData: string = data;
      await this.modalController.dismiss(onClosedData);
      if(this.paramTitle == 1){
        this.router.navigate(['/home']);
      }else{
        this.successFullRegistration();
      }
  }
}
