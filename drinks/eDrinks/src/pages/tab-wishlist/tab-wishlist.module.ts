import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabWishlistPage } from './tab-wishlist';
import { PreloadImageComponentModule } from '../../components/preload-image/preload-image.module';

@NgModule({
  declarations: [
    TabWishlistPage,
  ],
  imports: [
    IonicPageModule.forChild(TabWishlistPage),
    PreloadImageComponentModule
  ],
  exports: [
    TabWishlistPage
  ]
})
export class TabWishlistPageModule {}
