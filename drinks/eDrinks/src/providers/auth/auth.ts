import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Observable } from 'rxjs/Rx';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { tableNames, googleWebClientId } from '../../app/app.constants';

@Injectable()
export class AuthProvider {

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public facebook: Facebook,
    public googleplus: GooglePlus,
    public platform: Platform
  ) {}

  /**
   * get auth state
   */
  get currentUser(): any {
    return this.getAuth().first();
  }

  /**
   * get auth
   */
  getAuth(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  /**
   * sign in with facebook
   */
  signInWithFacebook(): firebase.Promise<any> {
    if (this.platform.is('cordova')) {
      return this.platform.ready().then(() => {
        return this.facebook.login(['email', 'public_profile']).then((res) => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          return this.afAuth.auth.signInWithCredential(facebookCredential);
        });
      });
    } else {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
  }

  /**
   * sign in with googleplus
   */
  signInWithGoogle(): firebase.Promise<any> {
    if (this.platform.is('cordova')) {
      return this.platform.ready().then(() => {
        return this.googleplus.login({
          'scopes': 'email',
          'webClientId' : googleWebClientId,
          'offline': true
        }).then((res) => {
          const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
          return this.afAuth.auth.signInWithCredential(googleCredential);
        }, (error) => {
          return firebase.Promise.reject(error);
        });
      });
    } else {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  }

  /**
   * sign in with github
   */
  signInWithGithub(): firebase.Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  /**
   * sign in with emai & password
   */
  signInWithEmail(credential: any): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(credential.email, credential.password);
  }

  /**
   * sign up with email & password
   */
  signUpWithEmail(credential: any): firebase.Promise<void> {
    return this.afAuth.auth.createUserWithEmailAndPassword(credential.email, credential.password);
  }

  /**
   * sign out
   */
  signOut(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }

  updateProfile(user): firebase.Promise<any> {
    user.updatedAt = firebase.database['ServerValue']['TIMESTAMP'];

    let providerData = user.providerData;
    if (providerData && providerData.providerId === 'facebook.com')
      user.photoURL = `https://graph.facebook.com/${providerData.uid}/picture?type=square`;
      
    return this.db.object(tableNames.User + '/' + user.uid).update(user);
  }

  /**
   * get full profile
   */
  getFullProfile(uid?: string): Observable<UserModel> {
    if (uid)
      return this.db.object(tableNames.User + '/' + uid);
    
    return Observable.create((observer) => {
      this.getAuth().subscribe((user: firebase.User) => {
        if (user !== null)
          this.db.object(tableNames.User + '/' + user.uid).subscribe((res) => observer.next(res));
      });
    });
  }

  getUserInfo(userId: string){
    
    if (userId)
      return this.db.object(tableNames.User + '/' + userId + '/' + tableNames.userInfo);

  }

  setUserInfo(userId: string, info: any) {
    return this.db.list(tableNames.User + '/' + userId + '/' + tableNames.userInfo)
      .push({
        lastName : info.Lname,
        firstName: info.Fname,
        DoB      : info.dob,
        userName : info.username,
        gender   : info.gender,
        timestamp: firebase.database['ServerValue']['TIMESTAMP']
      });
  }

  getUserWishlist(userId: string){
    if (userId)
      return this.db.object(tableNames.User + '/' + userId + '/' + tableNames.Wishlist);
  }

  setUserWishlist(userId: string, drinks: any) {
    return this.db.list(tableNames.User + '/' + userId + '/' + tableNames.userInfo)
      .push({
        drinkName   : drinks.drinkName,
        drinkType   : drinks.Type,
        description : drinks.description,
        price       : drinks.price,
        quantityLeft: drinks.quantityLeft
      });
  }

  getUserCart(userId: string){
    if (userId)
      return this.db.object(tableNames.User + '/' + userId + '/' + tableNames.Cart);
  }

  setUserCart(userId: string, quntity:string, drinks: any) {
    return this.db.list(tableNames.User + '/' + userId + '/' + tableNames.userInfo)
      .push({
        drinkName      : drinks.drinkName,
        drinkType      : drinks.Type,
        description    : drinks.description,
        price          : drinks.price,
        quantityLeft   : drinks.quantityLeft,
        quantityNeeded : quntity,
      });
  }

  getUserOrder(userId: string){
    if (userId)
      return this.db.object(tableNames.User + '/' + userId + '/' + tableNames.Order);
  }

}

export class UserModel {
  uid?: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  providerData?: any;
  userInfo?: any;
  wishlist?: any;
  order?: any;
  cart?: any;
}

export class InfoModel{

  lastName ?: string;
  firstName?: string;
  DoB      ?: string;
  userName ?: string;
  gender   ?: string;
  timestamp?: string;
}

export class DrinkModel{

  drinkName    ?: string;
  drinkType    ?: string;
  description  ?: string;
  price        ?: string;
  quantityLeft ?: string;

}
/*
export class WishlistModel{

  drinkName    ?: string;
  description  ?: string;
  price        ?: string;
  quantityLeft ?: string;

}

export class CartModel{
  drinkName    ?: string;
  description  ?: string;
  price        ?: string;
  quantityLeft ?: string;
  timestamp    ?: string;
}

export class OrderModel{
  drinkName    ?: string;
  description  ?: string;
  price        ?: string;
  quantityLeft ?: string;
  timestamp    ?: string;
}*/