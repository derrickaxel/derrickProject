import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { wholeData } from '../../app/app.constants';

import { ModalInfo } from '../modal-info/modal-info';

@IonicPage()
@Component({
  selector: 'page-tab-home',
  templateUrl: 'tab-home.html',
})
export class TabHomePage {
  user: {displayName?: string, email?: string, photoURL?: string} = {};

  product: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public authProvider: AuthProvider , public modalCtrl: ModalController) {
    this.user.photoURL = 'assets/img/noavatar.png';
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.authProvider.currentUser
      .subscribe(user => {
        loading.dismiss();
        console.log("ok");
        if (user.userInfo === null)
        {
          console.log("userInfo is empty");
        }
        this.user.displayName  = user.displayName;
        this.user.email        = user.email || user.providerData[0].email || 'Not set yet.';
        this.user.photoURL     = user.photoURL || this.user.photoURL;
        this.product = wholeData.sliderImages;
      }, (error)=> {
        loading.dismiss();
        console.log('Error: ' + JSON.stringify(error));
      });
  }

  changeProfile() {
    
  }

  // Set post modal
  presentModal() {
    let modal = this.modalCtrl.create(ModalInfo, 
    { // Send data to modal
      
    }, // This data comes from API!
    { showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
  }



}
