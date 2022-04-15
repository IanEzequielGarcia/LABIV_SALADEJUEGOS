import { Component,OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario={
    email:'',
    password:''
  }
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {}
  logIn() {
    const{email,password} =this.usuario;
    this.authService.SignIn(email, password)
      .then((res) => {
        window.alert('Logueado Correctamente');
        this.router.navigate(['home']);
      }).catch((error) => {
        window.alert(error.message);
        return null;
      });
  }
  async registro()
  {
    const{email,password} =this.usuario;
    this.authService.RegisterUser(email,password)
    .then((res) => {
      window.alert('Registrado Correctamente');
    }).catch((error) => {
      window.alert(error.message);
      return null;
    });
  }
  async logInGoogle() {
    this.authService.logInGoogle()
    .then((res) => {
      window.alert('Logueado Correctamente');
    }).catch((error) => {
      window.alert(error.message);
      return null;
    });
  }
  
}
