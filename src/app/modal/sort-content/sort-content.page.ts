import { Component, OnInit } from '@angular/core';
import { FilterContentPage } from '../otp/filter-content/filter-content.page';
import { FetchService } from '../../fetch.service';
import { StorageService } from '../../storage.service';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';
declare var $:any;
@Component({
  selector: 'app-sort-content',
  templateUrl: './sort-content.page.html',
  styleUrls: ['./sort-content.page.scss'],
})
export class SortContentPage implements OnInit {
 dataReturned: any;
 model:any={};
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
	  private fetch: FetchService,
    private storage: StorageService
  ) { }

  ngOnInit() {
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	//this.fetch.getKeyText(lang_code).subscribe(res => {
    let res = this.storage.getScope();
		let item1 = res.find(i => i.key_text === 'SORT');
			this.model.key_text1 = item1[lang_code];
		let item2 = res.find(i => i.key_text === 'FILTER');
			this.model.key_text2 = item2[lang_code];
		let item3 = res.find(i => i.key_text === 'BY_DISTANCE');
			this.model.key_text3 = item3[lang_code];
		let item4 = res.find(i => i.key_text === 'BY_TIME');
			this.model.key_text4 = item4[lang_code];
		let item5 = res.find(i => i.key_text === 'SAVE_CHANGES');
			this.model.key_text5 = item5[lang_code];
		
	//});
  }

  async closeModal() {
    const onClosedData: string = "close";
    await this.modalController.dismiss(onClosedData);
  }
  
  async openModalFilter() {
	this.closeModal();
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
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }
  save(){
	  this.model.distance = null;
	  this.model.time = null;
	  var self = this;
	  $('input[type="checkbox"]:checked').each(function() {
	   if(this.value == 1){
			self.model.distance = this.value;   
	   }
	     if(this.value == 2){
		   self.model.time = this.value;
	   }
	});
	let data = {distance : self.model.distance, time : self.model.time};
	  console.log(data);
	  self.modalController.dismiss(data);
  }

}
