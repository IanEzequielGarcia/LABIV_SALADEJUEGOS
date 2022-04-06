import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private afauth:AngularFireAuth) { }
  public async logInGoogle() {
    try{
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }catch(err)
    {
      console.log("error en login ",err);
      return null;
    }
  }
}
