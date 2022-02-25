import { Component, OnInit,Input  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from '../../fetch.service';
import { StorageService } from '../../storage.service';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';
  declare var $: any;
@Component({
  selector: 'app-donate-food-content',
  templateUrl: './donate-food-content.page.html',
  styleUrls: ['./donate-food-content.page.scss'],
})
export class DonateFoodContentPage implements OnInit {
  @Input() veg;
  @Input() nonveg;
  @Input() veg_food;
  @Input() nonveg_food;
model:any={};
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
	private router: Router,
	private fetch: FetchService,
  private storage: StorageService,
  ) { }

  ngOnInit() { 
  $("#donate_food_spinner").show();
  $(".modal_content").css("opacity",0);
  var lang_code = JSON.parse(localStorage.getItem('lang'));
  this.model.user_id = JSON.parse(localStorage.getItem('user_registerd'));
  let data = JSON.stringify({'id': this.model.user_id});
	this.fetch.profile(data).subscribe(res => {
	  //	console.log(res);
    $("#donate_food_spinner").hide();
    $(".modal_content").css("opacity",1);
		this.model.username = res['username'];
		// this.model.dob = res['dob'];
		// this.model.food_type = res['type_of_food_you_prefer'];
		// $('#profile_food_'+res['type_of_food_you_prefer']).addClass('active');
	});
    //this.fetch.getKeyText(lang_code).subscribe(res => {
        let res = this.storage.getScope();
        let item1 = res.find(i => i.key_text === 'DEAR');
        this.model.key_text1 = item1[lang_code];
        let item2 = res.find(i => i.key_text === 'DONATION_MSG_1');
        this.model.key_text2 = item2[lang_code];
        let item3 = res.find(i => i.key_text === 'PEOPLE');
        this.model.key_text3 = item3[lang_code];
        let item4 = res.find(i => i.key_text === 'DONATE_MSG_2');
        this.model.key_text4 = item4[lang_code];
        let item5 = res.find(i => i.key_text === 'DONATE_MSG_3');
        this.model.key_text5 = item5[lang_code];
        let item6 = res.find(i => i.key_text === 'DONATE_MSG_4');
        this.model.key_text6 = item6[lang_code];
        let item7 = res.find(i => i.key_text === 'THANK_YOU_FOR_YOUR_KIND_GESTURE');
        this.model.key_text7 = item7[lang_code];
      
      // let item1 = res.find(i => i.key_text === 'THANK_YOU_FOR_YOUR_KIND_GESTURE');
      //   this.model.key_text1 = item1[lang_code]; 
      // let item2 = res.find(i => i.key_text === 'END_DONATION_MSG');
      //   this.model.key_text2= item2[lang_code]; 
      // let item3 = res.find(i => i.key_text === 'CHECK_DONATION');
      //   this.model.key_text3= item3[lang_code]; 
        
    //});
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
	this.router.navigate(['/home']);
  }

} 
