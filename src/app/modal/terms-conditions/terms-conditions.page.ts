import { Component, OnInit,Input } from '@angular/core';
import { FetchService } from '../../fetch.service';
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
  model:any={};
  constructor(private modalController: ModalController,
    private navParams: NavParams,
	private fetch: FetchService) { }

  ngOnInit() {
    console.log(this.content);
    var lang_code = JSON.parse(localStorage.getItem('lang'));
    // this.fetch.get_terms_conditions(lang_code).subscribe(res=>{
    //     if(res.success){
    //        this.model.content = res.data.content;
    //     }else{
    //       this.model.content = '';
    //     }
    //     console.log(res.status);
    // });
  }
  async closeModal() {
      const onClosedData: string = "Wrapped Up!";
      await this.modalController.dismiss(onClosedData);
  }
}
