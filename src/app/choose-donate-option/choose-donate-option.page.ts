import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController , ModalController } from '@ionic/angular';
import { CurrentLocationContentPage } from '../modal/current-location-content/current-location-content.page';
@Component({
  selector: 'app-choose-donate-option',
  templateUrl: './choose-donate-option.page.html',
  styleUrls: ['./choose-donate-option.page.scss'],
})
export class ChooseDonateOptionPage implements OnInit {
  model:any={};
  notification:any=[];
  dataReturned: any;
  alert_text: any;
  donate_address: any;
  location_data: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fetch: FetchService,
    private storage: StorageService,
    public alertController: AlertController,
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.model.is_volunteer = 0;
    if(localStorage.getItem('volunteer_approve') != null){
      this.model.is_volunteer = localStorage.getItem('volunteer_approve');
    }  
    var id = parseInt(this.route.snapshot.params['id']);
	  var id2 = parseInt(this.route.snapshot.params['id2']);
    this.model.veg = id;
    this.model.nonveg = id2;
    this.model.okay = 'okay';
    var lang_code = JSON.parse(localStorage.getItem('lang'));
      let res = this.storage.getScope();
      let item1 = res.find(i => i.key_text === 'NEARBY');
        this.model.key_text1 = item1[lang_code]; 
      let item2 = res.find(i => i.key_text === 'ON_THE_WAY');
        this.model.key_text2 = item2[lang_code]; 
      let alert_text = res.find(i => i.key_text === 'KEEP_PIN_EXACT_LOCATION');
        this.alert_text = alert_text[lang_code];
      let item3 = res.find(i => i.key_text === 'NO_VOLUNTEER_FOUND');
      this.model.key_text3 = item3[lang_code];
      let item4 = res.find(i => i.key_text === 'CLOSE');
      this.model.key_text4 = item4[lang_code];
      let item5 = res.find(i => i.key_text === 'HOME');
      this.model.key_text5 = item5[lang_code];
    let item6 = res.find(i => i.key_text === 'ACTIVITY');
      this.model.key_text6 = item6[lang_code];
    let item7 = res.find(i => i.key_text === 'VOLUNTEER');
    this.model.key_text7 = item7[lang_code];
    }
    async showAlert(msg){
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
             //this.router.navigate(['/home']);
            }
          }
        ]
      });
    
      await alert.present();
    }
    async openModalCurrentLocation() {
      localStorage.setItem('set_confirm_location_route', JSON.stringify('donate-food'));
        const modal = await this.modalController.create({
        component: CurrentLocationContentPage,
        cssClass: 'custom_current_location_modal_new',
        componentProps: {
          "paramID": 123,
          "paramTitle": "Test Title"
        }
        });  
    
        modal.onDidDismiss().then((dataReturned) => {
        if (dataReturned !== null) {
          this.dataReturned = dataReturned.data;
          this.location_data = JSON.parse(this.dataReturned);
          this.donate_address =this.dataReturned;
          var formData: any = new FormData();
          formData.append("id", this.model.veg);
          formData.append("id2", this.model.nonveg);
          formData.append("donate_address", this.donate_address);
          this.fetch.test(formData).subscribe(res => {
            if(res['success'] == true){ 
              if(res['data'].length > 0){
                this.router.navigate(['/searching-volunteer',this.model.veg,this.model.nonveg]);
              }else{
                this.showAlert(this.model.key_text3);
                this.router.navigate(['/screen-after-volunteer-not-found',this.model.veg,this.model.nonveg]);
              }
            }
          });
          
        }
        });
    
        return await modal.present();
      } 
  openOnTheWay(){
    this.router.navigate(['/on-the-way-search',this.model.veg,this.model.nonveg])
  }
}
