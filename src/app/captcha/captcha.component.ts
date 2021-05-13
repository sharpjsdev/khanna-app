import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { FetchService } from '../fetch.service';
declare var $ :any;
@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss'],
})
export class CaptchaComponent implements OnInit {
  model :any= {};
 private notification : any = [];
  constructor(
    private fetch: FetchService
	  
  ) { }

  ngOnInit() {
    this.model.user_id = localStorage.getItem('user_id');
    this.fetch.get_notification(this.model.user_id).subscribe(res => {
			this.notification = res['data'];
			if(this.notification.length >0){
        $('#black_spot').show();
      }
      }); 
      
      
  }
  ngOnDestroy() {
    this.fetch.read_notification(this.model.user_id).subscribe(res => {
      $('#black_spot').hide();
     });
  }

}
