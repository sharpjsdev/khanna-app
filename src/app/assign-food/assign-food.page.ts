import { Component, OnInit,Input } from '@angular/core';
import { FetchService } from '../fetch.service';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';
@Component({
  selector: 'app-assign-food',
  templateUrl: './assign-food.page.html',
  styleUrls: ['./assign-food.page.scss'],
})
export class AssignFoodPage implements OnInit {
 @Input() request_food_id; 
 model:any={};
  constructor( private modalController: ModalController,private fetch:FetchService) { }

  ngOnInit() {
    
    
  }
  ionViewWillEnter() {
    this.model.user_id = JSON.parse(localStorage.getItem('user_registerd'));
     this.fetch.get_available_food(this.model.user_id).subscribe((res)=>{
        if(res.success){
          this.model.available_food = res.data;
        }
     });
  }
  async closeModal() {
    
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
  AssignFood(){
    if(this.model.donate_food_id){
      this.model.error = false;
      let data = JSON.stringify({'request_food_id': this.request_food_id, 'donate_food_id' : this.model.donate_food_id,'status':1 });
      this.fetch.volunteer_receive_requested_food(data).subscribe(res => {
        this.closeModal();
      });
    }else{
      this.model.error = true;
    }
  } 
}
