import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController,
   public events: Events, private fb: Facebook
   ) {
  	this.menuCtrl.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginFacebook__() {
    const fechaInicio = new Date();
    console.log(fechaInicio);
        localStorage.setItem('username', 'Usuario invitado');
    localStorage.setItem('FechaInicio', ''+fechaInicio);
  	this.navCtrl.setRoot(HomePage);
  }

   loginFacebook(){
    this.fb.login(['public_profile', 'email'])
    .then((res: FacebookLoginResponse) => {
      console.log('Logged into Facebook!', res);
      this.fb.api("/"+res.authResponse.userID+"?fields=id,email,name,birthday,picture?redirect=0,type=large",["email", "public_profile","user_birthday"]).then((resp) => {
        console.log("Result: ",resp.email);
        localStorage.setItem('username', resp.email);
        localStorage.setItem('sessionKey', res.authResponse.accessToken);
        localStorage.setItem('FechaInicio', ''+new Date());
        this.navCtrl.setRoot(HomePage);
      }).catch(e => console.log('Error api----', e));
    })
    .catch(e => {
      console.log('Error logging into Facebook', e);       
    });
  }

}
