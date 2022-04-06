import { Component,OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AuthService } from '../services/auth.service';
import { AuthenticationService } from '../shared/authentication-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private authServiceLogin: AuthService,
    
    private router: Router
  ) {}
  ngOnInit() {}
  logIn(email:any, password:any) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        window.alert('Logueado Correctamente');
      }).catch((error) => {
        window.alert(error.message);
        return null;
      });
  }
  async registro(email:any,password:any)
  {
    console.log(email.value+password.value);
    this.authService.RegisterUser(email.value,password.value)
    .then((res) => {
      window.alert('Registrado Correctamente');
    }).catch((error) => {
      window.alert(error.message);
      return null;
    });
  }
  async logInGoogle() {
    this.authServiceLogin.logInGoogle()
    .then((res) => {
      window.alert('Logueado Correctamente');
    }).catch((error) => {
      window.alert(error.message);
      return null;
    });
  }
  
}
