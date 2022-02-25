import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.page.html',
  styleUrls: ['./view-feedback.page.scss'],
})
export class ViewFeedbackPage implements OnInit {
  model:any={};
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fetch: FetchService,
    private storage : StorageService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.model.feedback_id = this.route.snapshot.params['id'];
    this.model.food_quality = '';
    this.model.packaging = '';
    this.model.behaviour = '';
    var lang_code = JSON.parse(localStorage.getItem('lang'));
    //this.fetch.getKeyText(lang_code).subscribe(res => {
      let res = this.storage.getScope();
      let item1 = res.find(i => i.key_text === 'FOOD_QUALITY');
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
      
      
      this.fetch.show_feedback_by_id(this.model.feedback_id).subscribe(res => {
          console.log(res);
          if(res.success == true){
            if(res.data.food_quality == 1){
              $('#food_quality_'+res.data.food_quality).addClass('active'); 
            }else if(res.data.food_quality == 2){
              $('#food_quality_'+res.data.food_quality).addClass('active'); 
            }else{
              $('#food_quality_'+res.data.food_quality).addClass('active');
            }
            if(res.data.packaging == 1){
              $('#packaging_'+res.data.packaging).addClass('active'); 
            }else if(res.data.packaging == 2){
              $('#packaging_'+res.data.packaging).addClass('active'); 
            }else{
              $('#packaging_'+res.data.packaging).addClass('active');
            }
            if(res.data.behaviour == 1){
              $('#behaviour_'+res.data.behaviour).addClass('active'); 
            }else if(res.data.behaviour == 2){
              $('#behaviour_'+res.data.behaviour).addClass('active'); 
            }else{
              $('#behaviour_'+res.data.behaviour).addClass('active');
            }
            $("#feedback_comment").val(res.data.comment);
      }
    })
      
    //});
    }
}
