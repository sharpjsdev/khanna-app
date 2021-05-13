import { Component, OnInit,Input } from '@angular/core';
import { FetchService } from '../../fetch.service';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';
  declare var $:any;
@Component({
  selector: 'app-cancel-allotedfood',
  templateUrl: './cancel-allotedfood.page.html',
  styleUrls: ['./cancel-allotedfood.page.scss'],
})

export class CancelAllotedfoodPage implements OnInit {
  @Input() id;
  model:any={};
  reasons:any=[];
  constructor(private modalController: ModalController,
    private navParams: NavParams,
	private fetch: FetchService) { }

  ngOnInit() {
    this.model.search = false;
    var lang_code = JSON.parse(localStorage.getItem('lang'));
    this.fetch.get_reasons(lang_code).subscribe(res=>{
      
      res['data'].forEach((val,i)=>{
        
        this.reasons.push({ label : val[''+lang_code+'']});
      
     
    });
    
  })
  }
  select_reason(value){
    
    this.model.selected_reason = value.detail.value;;
  
  }
  cancelDonation(){
    this.model.search = true;
    let reason = this.model.selected_reason;
    if(!reason){
      $('#reason_msg').show();
      this.model.search = false;
    }else{
      $('#reason_msg').hide();
      let comment = $('#comments').val();
      let data = JSON.stringify({'id' : this.id, 'reason' : reason, 'comment' : comment });
     

      this.fetch.cancel_alloted_request(data).subscribe(res=>{
        this.model.search = false;
        this.closeModal(1);
      });
    }
  }
  async closeModal(isDone) {

    const onClosedData: string = isDone;
    await this.modalController.dismiss(onClosedData);
  }

}
