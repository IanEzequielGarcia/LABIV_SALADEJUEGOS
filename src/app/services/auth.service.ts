import { Injectable, NgZone } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { User } from '../shared/users';
import { doc, Firestore, setDoc } from "firebase/firestore";
import { getFirestore,collection, addDoc,getDocs,runTransaction } from "firebase/firestore";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);
  esAdmin=true;
  constructor(
    private afauth:AngularFireAuth,
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    )
    {
      this.isLoggedIn().subscribe(usuario=>{
        if(usuario!=null)
        {
          console.log(usuario.email);
          this.esAdmin=this.EsAdmin(usuario);
          console.log(this.esAdmin);
        }
      });
    }
  public EsAdmin(usuario:any){
    return usuario&&usuario.email == "juanperez@gmail.com";
  }
  public async getMensajes(){
    const snapshot = await firebase.firestore().collection('chat').get()
    return snapshot.docs.map(doc => doc.data());
  }
  public async getRtasEncuentras(){
    const snapshot = await firebase.firestore().collection('encuesta').get()
    return snapshot.docs.map(doc => doc.data());
  }
  public async getPuntajes(){
    const snapshot = await firebase.firestore().collection('puntaje').get()
    return snapshot.docs.map(doc => doc.data());
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
    let fecha = new Date();
    addDoc(collection(this.db,"logger"), {
      email: email,
      fecha: `${fecha.getDay()}/${fecha.getMonth()}`,
    });
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }
  // Register user with email/password
  async RegisterUser(email:string, password:string) {
    addDoc(collection(this.db,"usuarios"), {
      email: email,
      fecha: password,
    });
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }
  async NuevoMensaje(datos:any){
    addDoc(collection(this.db,"chat"), {datos});
  }
  async agregarEncuesta(encuesta:any){
    addDoc(collection(this.db,"encuesta"), {encuesta});
  }
  async agregarPuntaje(puntaje:any){
    addDoc(collection(this.db,"puntaje"), {puntaje});
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
  /*async PasswordRecover(passwordResetEmail:string) {
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
  }*/
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
