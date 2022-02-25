import { Component, OnInit,Input } from '@angular/core';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';

@Component({
  selector: 'app-common-search-screen',
  templateUrl: './common-search-screen.page.html',
  styleUrls: ['./common-search-screen.page.scss'],
})
export class CommonSearchScreenPage implements OnInit {
  model:any={};
  @Input() type;
  constructor(
    private modalController: ModalController,
    private storage : StorageService,
  ) { }

  ngOnInit() {
    var lang_code = JSON.parse(localStorage.getItem('lang'));
    let res = this.storage.getScope();
    if(this.type == 'nearby'){
    let item1 = res.find(i => i.key_text === 'GET_SEARCH_PAGE_NEAR_1');
        this.model.key_text1 = item1[lang_code];
    }
    if(this.type == 'ontheway'){
      let item1 = res.find(i => i.key_text === 'GET_SEARCH_PAGE_ONTHEWAY_1');
        this.model.key_text1 = item1[lang_code];
    }
  }

}
