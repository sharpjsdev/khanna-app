import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ErrorMsgModalPage } from './modal/error-msg-modal/error-msg-modal.page';
@Injectable({
  providedIn: 'root'
})
export class ErrorMsgService {

  constructor(
    public modalController: ModalController
  ) { }

  async showModal(msg){
    return new Promise(async (resolve) => {
    const modal = await this.modalController.create({
			component: ErrorMsgModalPage,
			cssClass: 'error_modal_css',
			componentProps: {
				"msg": msg,
			}
		});
	
		modal.onDidDismiss().then((dataReturned) => {
		});
	
		return await modal.present();
  });
  }
}
