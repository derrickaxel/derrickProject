import { Component } from '@angular/core';
import { IonicPage, App, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { AuthProvider, UserModel } from '../../providers/auth/auth';
import { ChatsProvider, MessageModel } from '../../providers/chats/chats';

@IonicPage()
@Component({
  selector: 'page-tab-wishlist',
  templateUrl: 'tab-wishlist.html',
})
export class TabWishlistPage {
  messages: Array<MessageModel>;
  user: UserModel;
  isThereAwishlist: boolean;

  constructor(
    public app: App, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, 
    public authProvider: AuthProvider,
    public chatProvider: ChatsProvider,
  ) {
  }

  ionViewDidLoad() {
    this.authProvider.getFullProfile()
      .subscribe((user: any) => {
        this.user = user;
        if(user){
          if(user.wishlist)
            this.isThereAwishlist = true;
          else
            this.isThereAwishlist = false;
        }
        else
          this.isThereAwishlist = false;
      }, (error)=> {
        console.log('Error: ' + JSON.stringify(error));
      });
      
  }

}

export const notifications = {
    today:[
      {
        name: "Martin",
        image: "./assets/img/notifications/100x100Notification1.jpeg",
        message: "Adam liked your photo",
        date: "5:03 pm"
      },
      {
        name: "Jessica",
        image: "./assets/img/notifications/100x100Notification2.png",
        message: "Justin invited you to the event Bday Party",
        date: "2:54 pm"
      },
      {
        name: "Phillip",
        image: "assets/img/notifications/100x100Notification3.jpg",
        message: "Alessia wrote on your timeline",
        date: "1:54 pm"
      }
    ],
    yesterday:[
      {
        name: "George",
        image: "assets/img/notifications/100x100Notification4.jpeg",
        message: "Helen mentioned you in a comment",
        date: "9:11 pm"
      },
      {
        name: "Kirsten",
        image: "./assets/img/notifications/100x100Notification5.jpg",
        message: "Ryan commented on your video",
        date: "3:09 pm"
      },
      {
        name: "Judith",
        image: "./assets/img/notifications/100x100Notification6.jpg",
        message: "Don recently likes the photo you’re tagged in",
        date: "11:34 am"
      },
      {
        name: "Diane",
        image: "./assets/img/notifications/100x100Notification7.jpg",
        message: "Giselle and Christian liked your status update",
        date: "7:12 am"
      }
  ]
};