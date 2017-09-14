import { Component } from '@angular/core';
import { ModalController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-modalinfo',
  templateUrl: 'modal-info.html',
})
export class ModalInfo {

  public modal_data = {};

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.modal_data = { // Getting data from previous page
      id: this.navParams.get('user_id'),
      username: this.navParams.get('username'),
      profile_img: this.navParams.get('profile_img'),
      post_img: this.navParams.get('post_img')
    };
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

}