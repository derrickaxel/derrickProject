import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabCartPage } from './tab-cart';
import { PreloadImageComponentModule } from '../../components/preload-image/preload-image.module';

@NgModule({
  declarations: [
    TabCartPage,
  ],
  imports: [
    IonicPageModule.forChild(TabCartPage),
    PreloadImageComponentModule
  ],
  exports: [
    TabCartPage
  ]
})
export class TabCartPageModule {}
