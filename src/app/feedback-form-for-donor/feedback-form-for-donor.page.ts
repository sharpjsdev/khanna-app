import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FeedbackContentPage } from '../modal/feedback-content/feedback-content.page';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';

declare var $: any;

@Component({
  selector: 'app-feedback-form-for-donor',
  templateUrl: './feedback-form-for-donor.page.html',
  styleUrls: ['./feedback-form-for-donor.page.scss'],
})
export class FeedbackFormForDonorPage implements OnInit {
  dataReturned: any;
  model:any={};
  constructor(
    public modalController: ModalController,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fetch: FetchService,
    private storage : StorageService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.model.r_id = this.route.snapshot.params['r_id'];
    this.model.getfood_id = this.route.snapshot.params['getfood_id'];
    this.model.food_quality = '';
    this.model.packaging = '';
    this.model.behaviour = '';
    var lang_code = JSON.parse(localStorage.getItem('lang'));
    //this.fetch.getKeyText(lang_code).subscribe(res => {
      let res = this.storage.getScope();
      let item1 = res.find(i => i.key_text === 'DONEE');
        this.model.key_text1 = item1[lang_code];
      let item2 = res.find(i => i.key_text === 'EXCELLENT');
        this.model.key_text2 = item2[lang_code];
      let item3 = res.find(i => i.key_text === 'GOOD');
        this.model.key_text3 = item3[lang_code];
      let item4 = res.find(i => i.key_text === 'BAD');
        this.model.key_text4 = item4[lang_code];
      let item5 = res.find(i => i.key_text === 'PACKAGING');
        this.model.key_text5 = item5[lang_code];
      let item6 = res.find(i => i.key_text === 'BEHAVIOUR');
        this.model.key_text6 = item6[lang_code];
      let item7 = res.find(i => i.key_text === 'COMMENT');
        this.model.key_text7 = item7[lang_code];
      let item8 = res.find(i => i.key_text === 'TYPE_HERE');
        this.model.key_text8 = item8[lang_code];
      let item9 = res.find(i => i.key_text === 'HOW_WAS_YOUR_EXPERIENCE');
        this.model.key_text9 = item9[lang_code];
      let item10 = res.find(i => i.key_text === 'SUBMIT');
        this.model.key_text10 = item10[lang_code];
      let item11 = res.find(i => i.key_text === 'PLEASE_FILL_ALL_THE_DETAILS');
			  this.model.alert_text = item11[lang_code]; 
		  let item12 = res.find(i => i.key_text === 'OKAY');
			  this.model.okay = item12[lang_code];
      
    //});
    }
    behaviour(val){
      this.model.behaviour = val;
      if(val == 1){
        $('#behaviour_'+val).addClass('active');  
        $('#behaviour_2').removeClass('active');  
        $('#behaviour_3').removeClass('active');  
      }else if(val == 2){
        $('#behaviour_'+val).addClass('active');  
        $('#behaviour_1').removeClass('active');  
        $('#behaviour_3').removeClass('active');    
      }else{
        $('#behaviour_'+val).addClass('active');  
        $('#behaviour_1').removeClass('active');  
        $('#behaviour_2').removeClass('active');     
      }  
      }
      submit(){
       
      var comment = $('#feedback_comment').val();
      
    
      if(this.model.behaviour == ''){
        this.presentAlert();
      }else{
        let data = JSON.stringify({'food_quality' : 0, 'packaging' : 0, 'behaviour' : this.model.behaviour, 'comment': comment, 'receiver_id' : this.model.r_id, 'getfood_id' : this.model.getfood_id , 'given_by':1});
        this.fetch.feedback_donor(data).subscribe(res => {
          if(res.success == true){
            this.openModalFeedback();
          }
        });
      }
      }
      async openModalFeedback() {
        const modal = await this.modalController.create({
          component: FeedbackContentPage,
          cssClass: 'custom_feedback_modal',
          componentProps: {
            "paramID": 123,
            "paramTitle": "Test Title"
          }
        });  
    
        modal.onDidDismiss().then((dataReturned) => {
        this.router.navigate(['/home']);
          if (dataReturned !== null) {
            
            //alert('Modal Sent Data :'+ dataReturned);
          }
        });
    
        return await modal.present();
      }
      
      async presentAlert() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        message: this.model.alert_text,
        buttons: [this.model.okay]
      });
      await alert.present();
      }
}
