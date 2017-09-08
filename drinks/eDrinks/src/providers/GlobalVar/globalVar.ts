import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { tableNames, googleWebClientId } from '../../app/app.constants';

@Injectable()
export class GlobalVarProvider {

  selectedPage:string;

  constructor(
    public platform: Platform
  ) {
    this.selectedPage = "home";
  }  

}
