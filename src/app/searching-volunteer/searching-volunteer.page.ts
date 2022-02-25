import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StorageService } from '../storage.service';
@Component({
  selector: 'app-searching-volunteer',
  templateUrl: './searching-volunteer.page.html',
  styleUrls: ['./searching-volunteer.page.scss'],
})
export class SearchingVolunteerPage implements OnInit {
model : any = {};
  tracking: any;
  tracking_timer: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fetch: FetchService,
    private storage : StorageService,
  ) { 
    var self = this;
    this.tracking_timer = setTimeout(function(){ self.stopTrackingLoop(); self.router.navigate(['/home']) }, 30000);
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    var lang_code = JSON.parse(localStorage.getItem('lang'));
    let res = this.storage.getScope();
    let item1 = res.find(i => i.key_text === 'SEARCHING_DONEE_NEAR_YOU');
		this.model.key_text1 = item1[lang_code];
    var id = parseInt(this.route.snapshot.params['id']);
	  var id2 = parseInt(this.route.snapshot.params['id2']);
    this.model.veg = id;
    this.model.nonveg = id2;
    
  }
  ionViewDidEnter() {
    this.startTrackingLoop();
  }
  ionViewWillLeave() {
      this.stopTrackingLoop();
  }

  startTrackingLoop() {
      this.tracking = setInterval(() => {
          this.checkVolunteer();
      }, 1000);
  }
  stopTrackingLoop() {
      clearInterval(this.tracking);
      clearTimeout(this.tracking_timer);
      this.tracking = null;
  }

  checkVolunteer(){
    
    var formData: any = new FormData();
    formData.append("id", this.model.veg);
    formData.append("id2", this.model.nonveg);
    this.fetch.checkVolunteerAcceptRequest(formData).subscribe(res => {
      if(res['success'] == true){
        this.router.navigate(['/display-accept-request-on-map',JSON.stringify(res['data']),this.model.veg,this.model.nonveg]);
        //alert(JSON.stringify(res['data']));
      }
    });
  }
}
