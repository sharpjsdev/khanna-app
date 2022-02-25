import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ConertToPickupSuccessPage } from '../modal/conert-to-pickup-success/conert-to-pickup-success.page';
import { DonateLaterMsgPage } from '../modal/donate-later-msg/donate-later-msg.page';
@Component({
  selector: 'app-choose-screen-after-reject',
  templateUrl: './choose-screen-after-reject.page.html',
  styleUrls: ['./choose-screen-after-reject.page.scss'],
})
export class ChooseScreenAfterRejectPage implements OnInit {
  model:any={};
  dataReturned: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fetch: FetchService,
    private storage: StorageService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.model.is_volunteer = 0;
    if(localStorage.getItem('volunteer_approve') != null){
      this.model.is_volunteer = localStorage.getItem('volunteer_approve');
    }  
    var id = parseInt(this.route.snapshot.params['id']);
	  var rid = parseInt(this.route.snapshot.params['rid']);
	  var fid = parseInt(this.route.snapshot.params['fid']);
    this.model.food_id = id;
    this.model.receiver = rid;
    this.model.fid = fid;
    var lang_code = JSON.parse(localStorage.getItem('lang'));
      let res = this.storage.getScope();
      let item1 = res.find(i => i.key_text === 'CONVERT_REQUEST_TO_PICKUP');
        this.model.key_text1 = item1[lang_code]; 
      let item2 = res.find(i => i.key_text === 'I_WILL_DONATE_LATER');
        this.model.key_text2 = item2[lang_code];
    }

    async successModal(food) {
      const modal = await this.modalController.create({
      component: ConertToPickupSuccessPage,
      cssClass: 'custom_current_location_modal',
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title",
        "food" : food
      }
      });  
  
      modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
      });
  
      return await modal.present();
    }

    async donateLaterModel() {
      const modal = await this.modalController.create({
      component: DonateLaterMsgPage,
      cssClass: 'custom_current_location_modal empty_message_height',
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"      }
      });  
  
      modal.onDidDismiss().then((dataReturned) => {
      
      });
  
      return await modal.present();
    }

    pickupRequest(){
      var formData: any = new FormData();
      formData.append("food_id", this.model.food_id);
      formData.append("receiver_id", this.model.receiver);
      formData.append("fid", this.model.fid);
       this.fetch.convert_to_pickup_request(formData).subscribe(res => {
        if(res['success'] == true){
          this.successModal(res['data']);
          this.router.navigate(['/home']);
        }
      });
    }
    donateLater(){
      var formData: any = new FormData();
      formData.append("food_id", this.model.food_id);
      formData.append("receiver_id", this.model.receiver);
      formData.append("fid", this.model.fid);
       this.fetch.donate_later_food(formData).subscribe(res => {
        if(res['success'] == true){
          this.donateLaterModel();
          this.router.navigate(['/home']);
        }
      });
    }
}
