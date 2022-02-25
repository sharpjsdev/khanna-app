import { Component, OnInit } from '@angular/core';
import { FetchService } from '../../fetch.service';
import { StorageService } from '../../storage.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  model:any={};
  notifications:any=[]; 
  constructor( 
	private fetch: FetchService,
  private storage: StorageService) { }

  ngOnInit() {
    this.model.is_volunteer = 0;
    if(localStorage.getItem('volunteer_approve') != null){
      this.model.is_volunteer = localStorage.getItem('volunteer_approve');
    }
    var lang_code = JSON.parse(localStorage.getItem('lang'));
   // this.fetch.getKeyText(lang_code).subscribe(res => {
     let res = this.storage.getScope();
        let item1 = res.find(i => i.key_text === 'DEAR');
        this.model.key_text1 = item1[lang_code];
        let item2 = res.find(i => i.key_text === 'KINDLY_PACK');
        this.model.key_text2 = item2[lang_code];
        let item3 = res.find(i => i.key_text === 'VEG');
        this.model.key_text3 = item3[lang_code];
        let item4 = res.find(i => i.key_text === 'NON_VEG');
        this.model.key_text4 = item4[lang_code];
        let item5 = res.find(i => i.key_text === 'FOOD_FOR');
        this.model.key_text5 = item5[lang_code];
        let item6 = res.find(i => i.key_text === 'COMING_FOR_PICKUP');
        this.model.key_text6 = item6[lang_code];
        let item7 = res.find(i => i.key_text === 'PEOPLE');
        this.model.key_text7 = item7[lang_code];
        let item8 = res.find(i => i.key_text === 'VOLUNTEER_REGISTER_MSG');
        this.model.key_text8 = item8[lang_code];
        let item9 = res.find(i => i.key_text === 'VOLUNTEER_REJECT_MSG');
        this.model.key_text9 = item9[lang_code];  
        let item10 = res.find(i => i.key_text === 'MSG_CANCEL_NOTI');
        this.model.key_text10 = item10[lang_code]; 
        let item11 = res.find(i => i.key_text === 'NO_NOTIFICATION_FOUND');
        this.model.key_text11 = item11[lang_code];
        let item12 = res.find(i => i.key_text === 'NOTI_RECEIVER')
        this.model.key_text12 = item12[lang_code]; 
        let item13 = res.find(i => i.key_text === 'HOME');
				this.model.key_text13 = item13[lang_code];
			  let item14 = res.find(i => i.key_text === 'ACTIVITY');
				this.model.key_text14 = item14[lang_code];
		  	let item15 = res.find(i => i.key_text === 'VOLUNTEER');
				this.model.key_text15 = item15[lang_code];  
          
      
    //});
    this.model.user_id = localStorage.getItem('user_id');
    let data = JSON.stringify({id: this.model.user_id});
    this.fetch.profile(data).subscribe(res => {
     
      this.model.username = res['username'];
      
    });
    this.fetch.v_check(this.model.user_id).subscribe(res => {
        if(res.success == true){
           this.model.status = res.status;
        }else {
          this.model.status = 0;
        }
    });
    this.fetch.get_notification(this.model.user_id).subscribe(res => {
      this.notifications = res['data'];
      
    });
  }
  async closeModal() {
    this.fetch.read_notification(this.model.user_id).subscribe(res => {
      
      
    });
  } 

}
