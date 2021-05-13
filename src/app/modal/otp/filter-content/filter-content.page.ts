import { Component, OnInit } from '@angular/core';
import { SortContentPage } from '../../sort-content/sort-content.page';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from '../../../fetch.service';
import { StorageService } from '../../../storage.service';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';
declare var $:any;
@Component({
  selector: 'app-filter-content',
  templateUrl: './filter-content.page.html',
  styleUrls: ['./filter-content.page.scss'],
})
export class FilterContentPage implements OnInit {
  dataReturned: any;
  model:any={};
  //const receiver_id: string = this.navParams.get('paramID');
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
  private storage: StorageService,
  ) { }

  ngOnInit() {  
  //console.log(this.receiver_id);
  var lang_code = JSON.parse(localStorage.getItem('lang'));
	//this.fetch.getKeyText(lang_code).subscribe(res => {
    let res = this.storage.getScope();
		let item1 = res.find(i => i.key_text === 'SORT');
			this.model.key_text1 = item1[lang_code];
		let item2 = res.find(i => i.key_text === 'FILTER');
			this.model.key_text2 = item2[lang_code];
		let item3 = res.find(i => i.key_text === 'SELECT_TYPE_OF_FOOD');
			this.model.key_text3 = item3[lang_code];
		let item4 = res.find(i => i.key_text === 'VEG');
			this.model.key_text4 = item4[lang_code]; 
		let item5 = res.find(i => i.key_text === 'NON_VEG');
			this.model.key_text5 = item5[lang_code]; 
		let item6 = res.find(i => i.key_text === 'BOTH');
			this.model.key_text6 = item6[lang_code]; 
		let item7 = res.find(i => i.key_text === 'FOOD_NEEDED_FOR');
			this.model.key_text7 = item7[lang_code]; 
		let item8 = res.find(i => i.key_text === 'SAVE_CHANGES');
			this.model.key_text8 = item8[lang_code]; 
	//});
  
  var filter_food_type = JSON.parse(localStorage.getItem('filter_food_type'));
  console.log(JSON.parse(localStorage.getItem('food_for_no_of_person')));
  if(JSON.parse(localStorage.getItem('food_for_no_of_person')) != null){
	$('#filter_food_needed').val(JSON.parse(localStorage.getItem('food_for_no_of_person')));
  }
	if(filter_food_type != null){
		this.model.food_type = filter_food_type;
		$('#filter_food_'+filter_food_type).addClass('active'); 
	}
  }  
  
  food_type(val){
	this.model.food_type = val; 
	if(val == 1){
		$('#filter_food_'+val).addClass('active');  
		$('#filter_food_2').removeClass('active');  
		$('#filter_food_3').removeClass('active');  
	}else if(val == 2){
		$('#filter_food_'+val).addClass('active');  
		$('#filter_food_1').removeClass('active');  
		$('#filter_food_3').removeClass('active');    
	}else{
		$('#filter_food_'+val).addClass('active');  
		$('#filter_food_2').removeClass('active');  
		$('#filter_food_1').removeClass('active');     
	}
	localStorage.setItem('filter_food_type', val);
	
	
  
  }
  filter(){
	localStorage.setItem('food_for_no_of_person', $('#filter_food_needed').val());
	let data = {filter_food_type : this.model.food_type, filter_no_of_person : $('#filter_food_needed').val()};
	this.modalController.dismiss(data);
  }

  async closeModal() {
    const onClosedData: string = "close";
    await this.modalController.dismiss(onClosedData);
  }
  async openModalSort() {
	this.closeModal();
    const modal = await this.modalController.create({
      component: SortContentPage,
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

} 
