import { Component, OnInit,Input  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from '../../fetch.service';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';
@Component({
  selector: 'app-error-msg-modal',
  templateUrl: './error-msg-modal.page.html',
  styleUrls: ['./error-msg-modal.page.scss'],
})
export class ErrorMsgModalPage implements OnInit {
  @Input() msg;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private router: Router,
    private fetch: FetchService
  ) { }

  ngOnInit() {
  }
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
