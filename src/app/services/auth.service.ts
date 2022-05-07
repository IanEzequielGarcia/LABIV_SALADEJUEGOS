import { Injectable, NgZone } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { User } from '../shared/users';
import { doc, Firestore, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
import { collection, addDoc } from "firebase/firestore";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  //app = initializeApp(environment as FirebaseOptions);
  //db = getFirestore(this.app);

  constructor(
    private afauth:AngularFireAuth,
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    ) {
      this.ngFireAuth.authState.subscribe((user) => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')||'{}');
        } else {
          localStorage.setItem('user', '');
          JSON.parse(localStorage.getItem('user')||'{}');
        }
      });
     }
  public async logInGoogle() {
    try{
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }catch(err)
    {
      console.log("error en login ",err);
      return null;
    }
  }
   // Login in with email/password
  async SignIn(email:string, password:string) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }
  // Register user with email/password
  async RegisterUser(email:string, password:string) {
    let dateTime = new Date();
      /*let docRef = await addDoc(collection(this.db, "logger"), {
      usuario: email,
      fecha: `${dateTime.getDay()}/${dateTime.getMonth()}/${dateTime.getFullYear()}`
    });*/
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }
  // Email verification when new user register
  /*
  SendVerificationMail() {
    return this.ngFireAuth.currentUser
      .then((user) =>user.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  */
  // Recover password
  async PasswordRecover(passwordResetEmail:string) {
    return this.ngFireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert(
          'Password reset email has been sent, please check your inbox.'
        );
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in
  isLoggedIn() {
    return this.afauth.authState;
  }
  // Returns true when user's email is verified
  /*get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user')|| '{}') ;
    return user.emailVerified !== false ? true : false;
  }*/
  // Auth providers
  /*AuthLogin(provider:any) {
    return this.ngFireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }*/
  // Store user in localStorage
  SetUserData(user:User) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign-out
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
