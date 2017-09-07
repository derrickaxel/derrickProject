import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
@IonicPage()
export class TabsPage {

  tab1Root = 'TabHomePage'
  tab2Root = 'TabWishlistPage'
  tab3Root = 'TabCartPage'
  tab4Root = 'TabProfilePage'


  constructor(public navCtrl: NavController) {}

}
