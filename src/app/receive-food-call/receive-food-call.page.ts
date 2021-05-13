import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-receive-food-call',
  templateUrl: './receive-food-call.page.html',
  styleUrls: ['./receive-food-call.page.scss'],
})
export class ReceiveFoodCallPage implements OnInit {
  model:any={};
  constructor(private route: ActivatedRoute,
    private router: Router,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.model.mobile_no = 'https://example-client-app-9884-dev.twil.io/index.html?phone='+this.route.snapshot.params['num'];
    this.model.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.model.mobile_no);
  }

}
