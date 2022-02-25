import { Component, OnInit , Input} from '@angular/core';
import { StorageService } from '../../storage.service';
import { FetchService } from '../../fetch.service';
import { DynamicMsgPage } from '../dynamic-msg/dynamic-msg.page';

import { 
  ModalController, AlertController ,
  NavParams 
  } from '@ionic/angular';
import { format } from 'highcharts';
@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.page.html',
  styleUrls: ['./push-notification.page.scss'],
})
export class PushNotificationPage implements OnInit {
  @Input() message;
  @Input() array;
  @Input() donor_details;
  @Input() request_id;
  model:any={};
  constructor(
    private storage: StorageService,
    private fetch: FetchService,
    private modalController: ModalController,
    private alertController:AlertController
  ) {
    
   }
   async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss('');
  }
  ngOnInit() {

    this.model.key_text1 = "Reject";
    this.model.key_text2 = "Accept";
    var lang_code = JSON.parse(localStorage.getItem('lang'));
    let res = this.storage.getScope();
    let item1 = res.find(i => i.key_text === 'REJECT');
      this.model.key_text1 = item1[lang_code]; 
    let item2 = res.find(i => i.key_text === 'ACCEPT');
      this.model.key_text2 = item2[lang_code]; 
    let item3 = res.find(i => i.key_text === 'VOLUNTEER_FOOD_REJECT_MSG');
      this.model.key_text3 = item3[lang_code]; 
    let item4 = res.find(i => i.key_text === 'CLOSE');
      this.model.key_text4 = item4[lang_code];
    let item5 = res.find(i => i.key_text === 'FOOD_ACCEPTED');
      this.model.key_text5 = item5[lang_code];
    let item6 = res.find(i => i.key_text === 'SOMETHING_WENT_WRONG');
      this.model.key_text6 = item6[lang_code];
    let item7 = res.find(i => i.key_text === 'FOOD_ALLOTED_TO_OTHER_VOLUNTEER');
      this.model.key_text7 = item7[lang_code];
  }

  acceptRequest(){
    var app_user_id = localStorage.getItem('user_id');
    var formData: any = new FormData();
    formData.append("donate_request", JSON.stringify(this.array));
    formData.append("donate_address", JSON.stringify(this.donor_details));
    formData.append("receiver_id", app_user_id);
    formData.append("request_id", this.request_id);
    this.fetch.volunterr_accept_request(formData).subscribe(res => {
      if(res['success']){
         this.closeModal();
         this.showAlert(res['message']);
      }
    })

  }

  async showAlert(msg){
    if(msg == 'Food accepted'){
      msg = this.model.key_text5
    }else if(msg == 'Food alloted to other volunteer'){
      msg = this.model.key_text7
    }else{
      msg = this.model.key_text6
    }
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class custom_alert_1',
      //header: 'Alert',
      message: msg,
      buttons: [
        {
          text: this.model.key_text4,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });
  
    await alert.present();
  }

  async RejectRequest() {
	
    this.closeModal();
    const modal = await this.modalController.create({
      component: DynamicMsgPage,
      cssClass: 'home_content_modal dynamic_model_css',
      componentProps: {
		  "msg" : this.model.key_text3
      }
    }); 

    modal.onDidDismiss().then((dataReturned) => {

    });

    return await modal.present();
  } 
}
